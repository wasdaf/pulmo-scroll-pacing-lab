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
html = html.replace("if(!reduced.matches&&(!spec?.worldTracers||spec.legacyFrom!==undefined))trailTick=", "if(studyOn&&window.studyClock.options.animate&&(!spec?.worldTracers||spec.legacyFrom!==undefined))trailTick=")
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
(out/'index.html').write_text(html,encoding='utf-8')
(out/'engine.js').write_text(engine,encoding='utf-8')
