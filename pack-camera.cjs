// Run after build-motion.cjs. Build independently seekable live packets for both detail settings.
// node pack-camera.cjs ../pulmo-p2-staging/node_modules/sharp
const fs=require('node:fs/promises');
const path=require('node:path');
async function packCamera(sharp){
  const root=path.join(__dirname,'live'), cut=require('./cut.json');
  const manifest=new Set(JSON.parse(await fs.readFile(path.join(root,'assets.json'))));
  for(const dir of ['camera','camera-fast'])await fs.mkdir(path.join(root,dir),{recursive:true});
  for(const frame of cut.frames.filter(f=>f.id<=446)){
    const name=String(frame.id).padStart(4,'0')+'.bin', layers='stream-v017/frames/'+name;
    const [plate,packet]=await Promise.all([fs.readFile(path.join(root,frame.source)),fs.readFile(path.join(root,layers))]);
    const end=4+packet.readUInt32LE(0);
    // Keep all registered paths and optical channels. Only the spatial sampling of the boundary field changes.
    const field=await sharp(packet.subarray(end)).resize(320,180,{kernel:'nearest'}).webp({lossless:true}).toBuffer();
    const header=Buffer.alloc(4);header.writeUInt32LE(plate.length);
    await fs.writeFile(path.join(root,'camera',name),Buffer.concat([header,plate,packet]));
    await fs.writeFile(path.join(root,'camera-fast',name),Buffer.concat([header,plate,packet.subarray(0,end),field]));
    manifest.delete(layers);manifest.delete(frame.source);manifest.add('camera/'+name);
  }
  await fs.writeFile(path.join(root,'assets.json'),JSON.stringify([...manifest].sort()));
}
module.exports=packCamera;
if(require.main===module)packCamera(require(process.argv[2]||'sharp')).catch(error=>{console.error(error);process.exitCode=1;});
