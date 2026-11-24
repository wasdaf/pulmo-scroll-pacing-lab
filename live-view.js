export function liveView(frame,settings,report) {
  let target=0, drawn=-1, busy=false, ready=false, failed=false, errorFrame=-1;
  const active=()=>settings.layers==='live'&&!document.hidden;
  const options=()=>({...settings,animate:settings.motion==='on',ribbons:settings.ribbons==='on',foreground:settings.foreground==='on'});
  function show() {frame.classList.toggle('ready',active()&&drawn>=0&&!failed);}
  async function run() {
    if(busy||!active()||!ready||failed||drawn===target||errorFrame===target)return;
    busy=true;
    try{
      while(active()&&drawn!==target){
        const id=target;
        try{await frame.contentWindow.studySelect(id);}
        catch(error){if(target!==id)continue;errorFrame=id;drawn=-1;show();report(null,'Live layers unavailable at this frame');console.warn(error);break;}
        drawn=id;show();report(drawn,'');
      }
    }finally{busy=false;}
  }
  function sync(){
    show();if(ready)frame.contentWindow.studyOptions(options(),active());
    if(!active()||failed)report(null,failed?'Live layers unavailable · camera plates':'');
    else if(ready&&drawn===target)report(drawn,'');
    else if(!ready)report(null,'Loading live anatomy…');
    if(errorFrame===target)errorFrame=-1;
    void run();
  }
  frame.addEventListener('load',async()=>{
    const w=frame.contentWindow;
    try{
      await w.studyIndexReady;
      await w.studyRendererReady;
      await w.breathStudy.loaded;
      if(w.studyFailed||!w.airwayStudy?.inspect().ready||!w.breathStudy.inspect().loaded)throw Error('Motion assets unavailable');
      ready=true;sync();
    }catch(error){failed=true;show();report(null,'Live layers unavailable · camera plates');console.warn(error);}
  });
  frame.src='live/index.html?frame=0&until=1084&look=both';
  const reach=document.getElementById('reach');
  setInterval(()=>{
    const v=frame.contentWindow?.studyClock?.reach;
    const text=active()&&drawn>=0&&drawn<=446&&Number.isFinite(v)?'Airway reach '+Math.round(Math.max(0,Math.min(1,v))*100)+'%':'';
    if(reach.textContent!==text)reach.textContent=text;
  },400);
  document.addEventListener('visibilitychange',sync);
  return {sync,seek(id){if(target!==id)errorFrame=-1;target=id;void run();},reset(){frame.contentWindow?.studyClock?.reset();},
    get shown(){return active()&&!failed?drawn:-1;},get waiting(){return active()&&ready&&!failed&&errorFrame!==target&&drawn!==target;}};
}
