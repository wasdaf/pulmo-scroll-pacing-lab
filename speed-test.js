// Traverse the same short lung and airway routes in both directions at each rate.
// Evaluate the camera frame actually committed by the selected renderer.
export function speedTest(view) {
  const button=document.getElementById('speedTest');
  const result=document.getElementById('speedResult');
  const rates=[.25,.5,1,2,4,8,16], chapters=[250,650];
  const raf=()=>new Promise(requestAnimationFrame);
  let current=null;
  function cancel(){
    if(!current)return;
    const run=current;current=null;run.abort.abort();
    view.seek(run.start);
    button.textContent='Test max speed';button.setAttribute('aria-pressed','false');
    result.textContent='Test canceled.';
  }
  async function settle(run,limit){
    const start=performance.now();
    while(current===run && performance.now()-start<limit){
      if(view.unavailable())throw Error('Live layers unavailable. Switch to Camera plates to test that view.');
      if(view.visible()===view.wanted())return performance.now()-start;
      await raf();
    }
    return Infinity;
  }
  function percentile(samples){
    // Weight each error by its duration so a long stall counts for the time it was visible.
    samples.sort((a,b)=>a.value-b.value);
    const limit=samples.reduce((sum,s)=>sum+s.ms,0)*.95;
    let total=0;
    for(const s of samples){total+=s.ms;if(total>=limit)return s.value;}
    return Infinity;
  }
  function range(chapter){
    const h=document.documentElement.clientHeight;
    const end=document.documentElement.scrollHeight-h,span=Math.min(1.25*h,end);
    const base=Math.max(0,Math.min(end-span,view.position(chapter)));
    return [base,base+span];
  }
  async function trial(run,chapter,rate){
    const h=document.documentElement.clientHeight,[base,end]=range(chapter),span=end-base;
    view.seek(base);
    if(!Number.isFinite(await settle(run,8000)))throw Error('The opening test frame took over 8 seconds to load. Preload this view and retry.');
    let prev=await raf(),start=prev,changes=0,last=view.visible();
    const lag=[],gaps=[];
    while(current===run){
      const t=await raf();if(current!==run)return false;
      const ms=t-prev;prev=t;
      const visible=view.visible(),target=view.wanted();
      const error=visible<0?Infinity:Math.abs(view.distance(target)-view.distance(visible))/h;
      lag.push({value:error,ms});gaps.push({value:ms,ms});
      if(visible!==last){last=visible;changes++;}
      const elapsed=(t-start)/1000,phase=(elapsed*rate*h/span)%2;
      view.seek(base+span*(1-Math.abs(1-phase)));
      if(elapsed>=2.5)break;
    }
    const catchup=await settle(run,1000);
    return changes>=4 && percentile(lag)<=.20 && percentile(gaps)<=50 && catchup<=200;
  }
  async function start(){
    if(current){cancel();return;}
    view.stop();
    const run={start:scrollY,abort:new AbortController()};current=run;
    button.textContent='Cancel test';button.setAttribute('aria-pressed','true');
    const passed=[];
    try{
      result.textContent='Preparing the lung and airway test routes…';
      if(!Number.isFinite(await settle(run,15000)))throw Error('The selected view is still loading. Try again when the frame appears.');
      if(current!==run)return;
      await view.warmTest(chapters.map(range),run.abort.signal,(done,total)=>{
        if(current===run)result.textContent='Preparing test frames · '+Math.round(done/total*100)+'%';
      });
      for(const rate of rates){
        let ok=true;
        for(const chapter of chapters){
          if(current!==run)return;
          result.textContent='Testing '+rate+' screens/s · '+(chapter===250?'lung detail':'airway interior')+'…';
          const pass=await trial(run,chapter,rate);
          if(current!==run)return;
          ok=ok&&pass;
        }
        if(ok)passed.push(rate);
      }
      const best=passed.at(-1),label=view.layer()==='live'?'Live layers':'Camera plates';
      result.textContent=label+' · Cached routes. '+(best?'Fastest passing rate: '+best+' screens/s'+(best===16?' (test ceiling).':'.'):'No tested rate passed on both shots.')+
        ' Passed: '+(passed.join(', ')||'none')+'.';
    }catch(err){if(current===run)result.textContent=err.message;}
    finally{
      if(current===run){
        current=null;run.abort.abort();view.seek(run.start);
        button.textContent='Test max speed';button.setAttribute('aria-pressed','false');
      }
    }
  }
  const manual=document.getElementById('measureScroll');
  let measurement=null;
  function endMeasurement(message){
    if(!measurement)return;
    measurement=null;
    manual.textContent='Measure my scroll';manual.setAttribute('aria-pressed','false');
    result.textContent=message;
  }
  manual.onclick=()=>{
    if(measurement){endMeasurement('Measurement canceled.');return;}
    cancel();view.stop();
    const run={};measurement=run;
    manual.textContent='Cancel measurement';manual.setAttribute('aria-pressed','true');
    result.textContent='Scroll as fast as you normally would for four seconds.';
    let previous=scrollY,firstMove=0,lastMove=0,peak=0;
    const began=performance.now(),recent=[{t:began-250,y:previous}],lag=[],h=document.documentElement.clientHeight;
    let lastTick=began;
    function sample(t){
      if(measurement!==run)return;
      const y=scrollY;
      if(y!==previous){lastMove=t;if(!firstMove)firstMove=t;previous=y;}
      recent.push({t,y});
      const boundary=t-250;
      while(recent.length>1&&recent[1].t<=boundary)recent.shift();
      if(recent.length>1&&recent[0].t<=boundary){
        const a=recent[0],b=recent[1];
        const startY=a.y+(b.y-a.y)*(boundary-a.t)/(b.t-a.t);
        peak=Math.max(peak,Math.abs(y-startY)*4/h);
      }
      if(firstMove&&t-lastMove<100){
        const i=view.visible();
        lag.push({value:i<0?Infinity:Math.abs(view.distance(view.wanted())-view.distance(i))/h,ms:t-lastTick});
      }
      lastTick=t;
      if(firstMove&&t-firstMove>=4000){
        const p=percentile(lag);
        endMeasurement('Peak scroll: '+peak.toFixed(1)+' screens/s over 250 ms. '+(Number.isFinite(p)?'95% of moving time within '+p.toFixed(2)+' screens of target.':'The selected view was still loading.'));
      }else if(!firstMove&&t-began>12000)endMeasurement('No page movement measured. Try again away from the end of the journey.');
      else requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  };
  const cancelManual=()=>endMeasurement('Measurement canceled.');
  document.addEventListener('pointerdown',e=>{if(!manual.contains(e.target)&&e.target.closest('button,select,input,dialog'))cancelManual();},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelManual();});

  button.onclick=()=>{cancelManual();start();};
  for(const event of ['wheel','touchmove'])window.addEventListener(event,cancel,{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'||!['Enter',' '].includes(e.key))cancel();});
  document.addEventListener('pointerdown',e=>{if(!button.contains(e.target))cancel();},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  return {cancel(){cancel();cancelManual();}};
}
