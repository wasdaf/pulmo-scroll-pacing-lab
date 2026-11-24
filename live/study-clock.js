// The original compositor reads its fill front and draw opacity here. Camera selection stays independent.
window.goldDownloadReady=true;
window.goldDownloads={state:{limit:1084},blobs:new Map(),atFrame(){},async waitFor(){}};
window.studyRendererReady=new Promise(resolve=>{window.unlockGoldJourney=resolve;});
window.studyClock={
  options:{idle:0.18,zoomFill:0.8,drift:0.7,boost:1,breathRate:1,animate:true},
  idleTime:0,lastWidth:null,pulse:0,inputAt:0,
  advance(dt){this.idleTime+=dt*this.options.idle;},
  speed(now=performance.now()){
    return this.options.drift+this.options.boost*this.pulse*Math.exp(-(now-this.inputAt)/240);
  },
  setZoom(width){
    if(!(width>0)||width===this.lastWidth)return;
    const now=performance.now();
    const advance=this.lastWidth?Math.max(0,Math.log2(this.lastWidth/width)):0;
    this.pulse=Math.min(2,this.pulse*Math.exp(-(now-this.inputAt)/240)+advance*2.4);
    this.inputAt=now;this.lastWidth=width;
  },
  reset(){this.idleTime=0;this.lastWidth=null;this.pulse=0;},
  cue(timing,frame){
    // Reserve a bounded extra reach for stationary viewing. Particles circulate at the cap.
    const extra=8*(-Math.expm1(-this.idleTime/8));
    const clock=Math.min(28,1+timing.clockAt(frame)*this.options.zoomFill+extra);
    const state=timing.state(clock,'fill',frame,false);
    state.gas=Math.max(state.gas,Math.min(.48,extra*.15));
    this.reach=state.front;
    return state;
  }
};
