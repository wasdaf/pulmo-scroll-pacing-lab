"""Adapt the published v055 compositor to an externally driven, same-origin study."""
from pathlib import Path
import json
import sys

source, out = Path(sys.argv[1]), Path(__file__).resolve().parent / 'live'
html = (source/'index.html').read_text(encoding='utf-8')
engine = (source/'engine-home-091e348d20bdb9a6.js').read_text(encoding='utf-8')

def span(text, start, end, replacement):
    a = text.index(start)
    b = text.index(end, a)
    return text[:a] + replacement + text[b:]

html = html.replace('<script src="download-gate.js"></script>', '<script src="study-clock.js"></script>')
html = span(html,'<link rel="stylesheet" href="homepage.css">','<script src="particle-optics', '<style>.nav,#viewerSwitch,#movieControls,#scale,#status,#playbackLoad,#hud{display:none!important} #stage{width:min(100vw,177.777778vh)!important;aspect-ratio:16/9}main{background:#101210}</style>')
html = span(html,'<script src="homepage.js">','</body>', '')
html = span(html,"  try {\n    const response = await fetch('engine-home-", "\n }\n start().catch", "  await load('engine.js');")
html = span(html,'  const guide=transition.value', '\n}', "  return 'scene/'+n+'.webp';")
html = span(html,"readIndex('journey-native-20261121-v003.json',true)", 'let position=selected', """
window.studyIndexReady=readIndex('journey-native-20261121-v003.json',true);
window.studySelect=async n=>{
  const index=frameIds.indexOf(n);
  if(index<0)throw Error('Missing selected frame '+n);
  await selectIndex(index);
  if(Number(stage.dataset.displayedFrame)!==n)throw Error('Frame not drawn '+n);
  window.studyClock.setZoom(window.gasScale[n]?.[0]);
};
let studyOn=true;
window.studyOptions=(options,active)=>{
  studyOn=active;
  Object.assign(window.studyClock.options,options);
  window.airwayStudy?.play(active && options.animate);
  window.breathStudy?.choose(options.look);
  palette.value=options.palette;applyPalette();
  densityMenu.value=options.density;
  window.showRibbons=options.ribbons;
  window.showForeground=options.foreground;
  window.airwayStudy?.redraw();updateParticles();window.redrawGoldNear?.();
};
""")
html = html.replace("  if(recording||window.stillJourney)return;\n   const n=Number(stage.dataset.displayedFrame)", "  if(recording||window.stillJourney)return;\n   window.studyFailed=true;\n   const n=Number(stage.dataset.displayedFrame)")
html = html.replace("if(Number.isFinite(trailLast))trailClock+=Math.min(.1,(now-trailLast)/1000);","if(studyOn && window.studyClock.options.animate && Number.isFinite(trailLast))trailClock+=Math.min(.1,(now-trailLast)/1000)*window.studyClock.speed(now);")
html = html.replace("if(!reduced.matches&&(!spec?.worldTracers||spec.legacyFrom!==undefined))trailTick=", "if(studyOn&&window.studyClock.options.animate)trailTick=")
# Travel along each saved six-point track. Fade only at its two endpoints on recycle.
html = html.replace("const phase=world?1:(i*.61803399+(reduced.matches?0:trailClock/(3.2+(i%9)*.26)))%1;",
                    "const cycle=(i*.61803399+trailClock/((world?5.4:3.2)+(i%9)*.26))%1;\n    const phase=world?.22+.78*cycle:cycle;")
html = html.replace("*(extra?approach:1);","*(extra?approach:1)*(world?ramp(0,.08,cycle)*(1-ramp(.92,1,cycle)):1);")
html = html.replace("if(n>=441&&n<=446&&direction>=0)warmPictures(446,Math.min(448,frameIds.length-1));","")
engine = engine.replace("function cue(){return timing.state(fillTime,mode,frame,!completedHold||frame<timing.holdEnd)}", "function cue(){return window.studyClock.cue(timing,frame)}")
engine = engine.replace("if(resume&&ready&&frame<timing.holdEnd&&!transport)transport={position:frame,end:timing.holdEnd,busy:false};","transport=null; autoplayPending=false;")
camera_ids=[f['id'] for f in json.loads((out.parent/'cut.json').read_text())['frames'] if f['id']<=446]
engine=engine.replace(' const neighbors=()=>{',' const cameraIds='+json.dumps(camera_ids)+';\n const neighbors=()=>{')
engine=engine.replace('return offsets.map(d=>target+d*direction).filter(n=>n>=0&&n<=446);',
                      'const index=cameraIds.indexOf(target);return offsets.map(d=>cameraIds[index+d*direction]).filter(n=>n!==undefined);')
engine = engine.replace('breath.tick(now,playing||window.journeySequencePlaying);','if(playing)window.studyClock.advance(dt);\n  breath.tick(now,playing);')
engine = engine.replace('if(!breath.enabled)time+=dt;', 'if(!breath.enabled)time+=dt*window.studyClock.speed(now);')
engine = engine.replace('time+=dt*breath.speed;', 'time+=dt*breath.speed*window.studyClock.speed(now);')
engine = span(engine,' const autoStart=playing&&','playing=false;autoplayPending=false;setPlaying(false);',' const autoStart=false;')
engine = engine.replace('if(advancing)seconds+=elapsed;', 'if(advancing)seconds+=elapsed*window.studyClock.options.breathRate;')
# Browser review plates are 960x540. Keep source-space displacement and optics calibrated
# in authored units while sampling framebuffer UVs in the actual review raster.
html = html.replace('id="flow" width="1920" height="1080"', 'id="flow" width="960" height="540"')
engine = (engine.replace('gl_FragCoord.x/1920.', 'gl_FragCoord.x/960.')
                .replace('gl_FragCoord.y/1080.', 'gl_FragCoord.y/540.')
                .replace('gl_FragCoord.xy/vec2(1920.,1080.)','gl_FragCoord.xy/vec2(960.,540.)')
                .replace('gl_PointSize=mix(', 'gl_PointSize=.5*mix('))
engine = span(engine, ' const size=n=>', ' const cameraIds=', ' const size=()=>(960*540+2*640*360)*4;\n')
engine = span(engine, "  const plateUrl=n>396?", "   signal.throwIfAborted", """
  item={controller,size:size(n),ready:false,speculative};
  const directory=new URLSearchParams(location.search).get('field')==='fine'?'camera/':'camera-fast/';
  item.promise=get(directory+k+'.bin',signal,priority).then(async blob=>{
   const header=async at=>new DataView(await blob.slice(at,at+4).arrayBuffer()).getUint32(0,true);
   const plateEnd=4+await header(0),wallEnd=plateEnd+4+await header(plateEnd);
   if(plateEnd<=4||wallEnd<=plateEnd+4||wallEnd>=blob.size)throw Error('Incomplete camera '+k);
   return Promise.all([blob.slice(4,plateEnd),blob.slice(plateEnd+4,wallEnd),blob.slice(wallEnd)]
     .map(layer=>decode(layer,k)));
  }).then(([p,wall,field])=>{
""")
# Defer speculative downloads and GPU buffer updates while requested views are in flight.
engine = engine.replace("if(document.hidden){await new Promise(resolve=>document.addEventListener",
                        """if(window.studyLayersActive===false || window.showPeptides===false&&!window.showRibbons || performance.now()-(window.studyInputTime||0)<500){
     await new Promise(resolve=>setTimeout(resolve,160));continue;
    }
    if(document.hidden){await new Promise(resolve=>document.addEventListener""")
engine = engine.replace('if(ready&&inView&&!document.hidden', 'if(ready&&window.studyLayersActive!==false&&inView&&!document.hidden')
engine = engine.replace('if(breath.enabled||playing||pointer.inside', 'if(playing||pointer.inside')
engine = engine.replace("    gasPass(0);", "    if(state.gas>.001 && (window.showRibbons!==false||window.showPeptides!==false))gasPass(0);")
engine = engine.replace('if(focus[3]>.002){','if(state.gas>.001 && focus[3]>.002){')
engine = engine.replace('timer=setTimeout(run,transporting||moved?0:40);','timer=setTimeout(run,transporting?0:moved?55:120);')
html = html.replace('studyOn=active;', 'window.studyLayersActive=studyOn=active;')
html = html.replace('window.showRibbons=options.ribbons;', "window.showPeptides=options.particles!=='off';\n  window.showRibbons=window.showPeptides&&options.ribbons;")
html = html.replace("const bounds=el('flowBounds').checked&&activeField;", "if(!window.showPeptides&&!window.showRibbons){trail.hidden=true;return;}\n  const bounds=el('flowBounds').checked&&activeField;")
html = html.replace('enabled:!window.stillJourney&&window.showPeptides', 'enabled:studyOn&&!window.stillJourney&&window.showPeptides')
html = html.replace('if(moving&&!reduced.matches)trailTick=', 'if(studyOn&&window.studyClock.options.animate&&moving&&!reduced.matches)trailTick=')

# Give the breathing field a network head start. The renderer also fetches it using CORS.
html = html.replace('<head>', '<head><link rel="preload" as="fetch" crossorigin href="breath-regional-v003.gz"><link rel="preload" as="script" href="engine.js">',1)
engine = engine.replace("performance.mark('lung-interactive');", "window.studyInputTime=performance.now();performance.mark('lung-interactive');")
# Hot-path reads avoid inspect(), which also checks the GPU error state.
engine = engine.replace('window.airwayStudy={redraw:draw,', 'window.airwayStudy={get ready(){return ready},get frame(){return frame},redraw:draw,')
html = html.replace('inspect().ready','ready').replace('inspect().frame','frame')
html = html.replace('window.studySelect=async n=>{', """
window.studyTestFiles=(ids,detail)=>{
  const files=new Set(),packet=n=>(detail==='fine'?'camera/':'camera-fast/')+String(n).padStart(4,'0')+'.bin';
  for(const n of ids){
    if(n<=446){files.add(packet(n));continue;}
    files.add(pictureFile(n));
    const spec=flowSpecs.get(n);
    if(spec?.paths)files.add(spec.paths);
    if(spec?.travel)files.add(packet(446));
  }
  return [...files];
};
window.studySelect=async n=>{""")

(out/'index.html').write_text(html,encoding='utf-8')
(out/'engine.js').write_text(engine,encoding='utf-8')
