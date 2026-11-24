// Build the web review from the same published camera, airway and tissue release as cut.json.
// node build-motion.cjs ../pulmo-p2-staging/public/pulmo/review-v055 ../pulmo-p2-staging/node_modules/sharp
const fs = require('node:fs/promises');
const path = require('node:path');
const {createHash} = require('node:crypto');
const sharp = require(process.argv[3] || 'sharp');
const source = path.resolve(process.argv[2]), out = path.join(__dirname,'live');
async function main() {
  const cut = JSON.parse(await fs.readFile(path.join(__dirname,'cut.json')));
  const release = JSON.parse(await fs.readFile(path.join(source,'download-manifest.json')));
  if (release.revision !== cut.release) throw Error('Wrong source release');
  const hashes = new Map(release.files.map(v=>[v.path,v.sha256]));
  async function read(file) {
    const b = await fs.readFile(path.join(source,file));
    if (hashes.get(file)!==createHash('sha256').update(b).digest('hex')) throw Error('Unverified '+file);
    return b;
  }
  const files = new Set();
  async function write(file,data) {
    await fs.mkdir(path.dirname(path.join(out,file)),{recursive:true});
    await fs.writeFile(path.join(out,file),data); files.add(file);
  }
  const rows = JSON.parse(await read(cut.index)), ids=new Set(cut.frames.map(f=>f.id));
  const selected = rows.filter(r=>ids.has(r[0]));
  const registered=JSON.parse(await read('depth-fields-v006.json'));
  await write(cut.index,JSON.stringify(selected));
  await write('depth-fields-v006.json',JSON.stringify(registered));
  const copy = new Set(['particle-optics-v004.js','breath-regional-v003.gz']);
  for(let i=0;i<24;i++) copy.add('stream-v017/detail-'+String(i).padStart(2,'0')+'.gz');
  for (const frame of cut.frames.filter(f=>f.id<=446)) {
    const key=String(frame.id).padStart(4,'0');
    const packet='stream-v017/frames/'+key+'.bin', b=await read(packet), split=4+b.readUInt32LE(0);
    const wall=await sharp(b.subarray(4,split)).resize(640,360).webp({quality:77}).toBuffer();
    // The lossless packed depth/mask channels feed the original particle occlusion shader.
    const field=await sharp(b.subarray(split)).resize(640,360,{kernel:'nearest'}).webp({lossless:true}).toBuffer();
    const header=Buffer.alloc(4); header.writeUInt32LE(wall.length);
    await write(packet,Buffer.concat([header,wall,field]));
    await write(frame.source,await sharp(await read(frame.source)).resize(960,540).webp({quality:85}).toBuffer());
  }
  for(const [id,file,,, ,spec] of selected) {
    const extra=registered[id]?.plate===file?registered[id].field:{};
    const field={...spec,...extra}; if(field.paths) copy.add(field.paths);
    const plate=field.guide||file;
    await write('scene/'+id+'.webp',await sharp(await read(plate)).resize(960,540).webp({quality:85}).toBuffer());
  }
  for(const file of copy) await write(file,await read(file));
  await write('assets.json',JSON.stringify([...files].sort()));
  console.log(files.size+' motion assets');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
