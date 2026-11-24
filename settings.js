const motionDefault=matchMedia('(prefers-reduced-motion: reduce)').matches?'still':'on';
const controls=[
  ['layers','View','live',{live:'Breathing + particles',plates:'Camera plates'}],
  ['motion','Ambient motion',motionDefault,{on:'Running',still:'Frozen'}],
  ['look','Breathing','both',{both:'Ribs + diaphragm',dome:'Diaphragm',ribs:'Ribs',off:'Off'}],
  ['breathRate','Breathing speed',1,.25,2,.05],
  ['idle','Resting fill rate',.18,0,.8,.02],
  ['zoomFill','Zoom-driven fill',.8,0,1.3,.05],
  ['drift','Particle speed',.7,.1,2,.1],
  ['boost','Flow boost while zooming',1,0,2,.1],
  ['field','Airway boundary detail','fast',{fast:'Fast · 320 × 180',fine:'Fine · 640 × 360'}],
  ['particles','Particle layers','on',{on:'On',off:'Off · breathing only'}],
  ['density','Particle density','light',{light:'Light',full:'Full'}],
  ['palette','Particle palette','accent',{accent:'Gold',original:'Original'}],
  ['ribbons','Airflow ribbons','on',{on:'On',off:'Off'}],
  ['foreground','Foreground particles','on',{on:'On',off:'Off'}],
  ['travel','Scroll distance',1,.4,2,.05],
  ['lungTravel','Lung-detail scroll distance',1,.25,3,.05],
  ['bilayerTravel','Bilayer scroll distance',1,.5,2,.05],
  ['auto','Autoplay speed (screens/s)',1,.25,16,.25],
];
export function setupSettings(url,onChange,getFrame) {
  const values={},inputs=[];
  for(const [key,label,initial,min,max,step] of controls){
    const choices=typeof min==='object', raw=url.searchParams.get(key);
    const value=raw===null?initial:choices?(Object.hasOwn(min,raw)?raw:initial):
      (Number.isFinite(Number(raw))?Math.min(max,Math.max(min,Number(raw))):initial);
    const row=document.createElement('label'), input=document.createElement(choices?'select':'input');
    row.append(document.createTextNode(label),input);
    if(choices)for(const [v,name] of Object.entries(min))input.add(new Option(name,v));
    else {input.type='range';input.min=min;input.max=max;input.step=step;}
    const output=document.createElement('output');if(!choices)row.append(output);
    function apply(rawValue){
      input.value=rawValue;values[key]=choices?input.value:Number(input.value);
      output.textContent=choices?'':Number(input.value).toFixed(2)+'×';
    }
    apply(value);
    input.addEventListener('input',()=>{
      apply(input.value);
      if(values[key]===initial)url.searchParams.delete(key);else url.searchParams.set(key,values[key]);
      history.replaceState(null,'',url);onChange(key);
    });
    inputs.push(()=>{apply(initial);url.searchParams.delete(key);});
    document.getElementById('fields').append(row);
  }
  document.getElementById('defaults').onclick=()=>{inputs.forEach(reset=>reset());history.replaceState(null,'',url);onChange('reset');};
  document.getElementById('copy').onclick=async()=>{
    const copy=new URL(url);copy.searchParams.set('frame',getFrame());
    try{await navigator.clipboard.writeText(copy.href);document.getElementById('copyResult').textContent='Link copied with this frame and settings.';}
    catch{document.getElementById('copyResult').textContent=copy.href;}
  };
  return values;
}
