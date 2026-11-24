import {methods, buildTracks, frameAt} from './pacing.js';
import {setupSettings} from './settings.js';
import {speedTest} from './speed-test.js';
import {liveView} from './live-view.js';
const byId = id => document.getElementById(id);
const status = byId('status');
const chapters = Array.from(byId('jump').options).filter(o => o.value !== '').map(o => [Number(o.value), o.text]);
const label = id => 'F' + String(id).padStart(4, '0');
const address = new URL(location.href);
let method = Object.hasOwn(methods, address.searchParams.get('method')) ? address.searchParams.get('method') : 'log';
history.scrollRestoration = 'manual';

async function start() {
  const response = await fetch('cut.json');
  if (!response.ok) throw Error('Frame list unavailable');
  const {frames, size, edit} = await response.json();
  let tracks;
  const indexById=new Map(frames.map((frame,index)=>[frame.id,index]));
  const canvas = byId('picture'), ctx = canvas.getContext('2d', {alpha:false});
  const slots = size.rows * size.columns;
  const cache = new Map();
  let unit = document.documentElement.clientHeight, wanted = 0, shown = -1, direction = 1;
  let playing = false, playHandle = 0, previousTime = 0, playY = 0;
  let paintQueued = false, lastScroll=-1, tester;
  const warmed=new Set();
  let preloading=false;
  let live, liveNotice='';
  const settings = setupSettings(address,key=>{
    if(key==='field'||key==='reset'&&live.field!==settings.field){
      address.searchParams.set('frame',frames[visibleIndex()].id);
      location.replace(address);return;
    }
    if(['travel','lungTravel','bilayerTravel','reset'].includes(key)){tracks=buildTracks(frames,settings);layout(visibleIndex());}
    if(!['auto','travel','lungTravel','bilayerTravel'].includes(key))live.sync();
    update();preloadLabel();refreshLabel();
  },()=>frames[visibleIndex()].id);
  function visibleIndex(){
    const id=live?.shown??-1;
    return id>=0?indexById.get(id):Math.max(0,shown);
  }
  function refreshLabel(){
    const id=frames[visibleIndex()].id;
    byId('frameText').textContent=shown<0&&live?.shown<0?'Loading…':label(id);
    byId('chapterText').textContent=chapters.filter(ch=>ch[0]<=id).at(-1)[1];
    status.textContent=settings.layers==='live'?liveNotice:'';
  }
  tracks=buildTracks(frames,settings);
  live=liveView(byId('motion'),settings,(_,notice)=>{liveNotice=notice;if(live?.needsPlate)paint();refreshLabel();});
  byId('settings').onclick=()=>{stop();byId('tuning').showModal();};
  function stop() {
    playing = false; cancelAnimationFrame(playHandle);
    byId('play').textContent = 'Play'; byId('play').setAttribute('aria-pressed','false');
  }
  function sheet(page) {
    const existing = cache.get(page);
    if (existing) return existing;
    const img = new Image(); img.decoding = 'async';
    const entry = {img, ready:false};
    cache.set(page, entry);
    img.onload = async () => {
      try { await img.decode(); } catch { /* draw the loaded image where available */ }
      entry.ready = true;
      if (Math.floor(wanted / slots) === page && cache.get(page) === entry) paint();
    };
    img.onerror = () => {
      if (cache.get(page) === entry) cache.delete(page);
      if (Math.floor(wanted / slots) === page) { stop(); status.textContent = 'Plate unavailable. Retry'; }
    };
    img.src = 'plates/' + page + '.webp';
    return entry;
  }
  // Show a single saved camera image during live startup. No atlas transfer on the live path.
  let posterPending=-1;
  function poster(index){
    if(shown===index||posterPending!==-1)return;
    posterPending=index;
    const f=frames[index],img=new Image();
    img.onload=()=>{
      if(posterPending!==index)return;
      posterPending=-1;
      if(live.shown>=0||live.needsPlate)return;
      if(wanted!==index){poster(wanted);return;}
      ctx.drawImage(img,0,0,canvas.width,canvas.height);shown=index;refreshLabel();
    };
    img.onerror=()=>{if(posterPending===index){posterPending=-1;if(wanted===index&&live.shown<0)paint();}};
    img.src='live/'+(f.id<=446?f.source:'scene/'+f.id+'.webp');
  }
  function paint() {
    if(live.shown>=0)return;
    const page = Math.floor(wanted / slots);
    const entry = sheet(page);
    if (!entry.ready) {status.textContent = 'Loading plate…'; return;}
    if (shown !== wanted) {
      const i = wanted % slots;
      ctx.drawImage(entry.img, (i % size.columns) * size.width, Math.floor(i / size.columns) * size.height, size.width, size.height, 0, 0, canvas.width, canvas.height);
      shown = wanted;
    }
    refreshLabel();
  }
  function update() {
    paintQueued = false;
    const track = tracks[method], distance = scrollY / unit;
    const next = frameAt(track, distance);
    if (next !== wanted) direction = Math.sign(next - wanted);
    wanted = next;lastScroll=scrollY;
    live.seek(frames[next].id);
    const progress = Math.max(0, Math.min(1, distance / track.at(-1)));
    byId('timeline').value = Math.round(progress * 10000);
    byId('percent').value = Math.round(progress * 100) + '%';
    if(live.shown>=0)return;
    if(settings.layers==='live'&&!live.needsPlate){poster(next);return;}
    paint();
    if(!live.needsPlate)return;
    const page = Math.floor(wanted / slots), last = Math.floor((frames.length - 1) / slots);
    const near = [page, page + direction, page - direction, page + 2 * direction].filter(n => n >= 0 && n <= last);
    for (const key of cache.keys()) if (!near.includes(key)) cache.delete(key);
    for (const key of near) sheet(key);
  }
  function seek(y) { window.scrollTo({top:y, behavior:'instant'}); update(); }
  function layout(index) {
    unit = document.documentElement.clientHeight*settings.travel;
    byId('travel').style.height = Math.ceil(document.documentElement.clientHeight + tracks[method].at(-1)*unit) + 'px';
    for (const b of document.querySelectorAll('[data-method]')) b.setAttribute('aria-pressed', String(b.dataset.method === method));
    byId('description').textContent = methods[method] + ' Scroll to explore.';
    seek(tracks[method][index] * unit);
  }
  function switchMode(value) {
    stop(); const index = visibleIndex();
    method = value; address.searchParams.set('method', method); history.replaceState(null,'',address);
    layout(index);
  }
  function tick(now) {
    if (!playing) return;
    if (previousTime) playY += Math.min(0.05, (now - previousTime) / 1000) * document.documentElement.clientHeight*settings.auto;
    previousTime = now;
    if(scrollY!==Math.round(playY)||wanted===frames.length-1)seek(playY);
    if (wanted === frames.length - 1 && visibleIndex()===wanted) {stop(); return;}
    playHandle = requestAnimationFrame(tick);
  }
  byId('play').onclick = () => {
    if (playing) {stop(); return;}
    if (wanted === frames.length - 1) seek(0);
    playing = true; previousTime = 0; playY = scrollY;
    byId('play').textContent = 'Pause'; byId('play').setAttribute('aria-pressed','true');
    playHandle = requestAnimationFrame(tick);
  };
  window.addEventListener('scroll', () => {if (!paintQueued && scrollY!==lastScroll) {paintQueued=true; requestAnimationFrame(update);}}, {passive:true});
  for (const event of ['wheel','touchstart','keydown']) window.addEventListener(event, stop, {passive:true});
  window.addEventListener('resize', () => {tester?.cancel();stop();layout(wanted);});
  document.addEventListener('visibilitychange', () => {if (document.hidden) stop();});
  for (const b of document.querySelectorAll('[data-method]')) b.onclick = () => switchMode(b.dataset.method);
  byId('restart').onclick = () => {stop();live.reset();seek(0);};
  byId('timeline').oninput = e => {stop(); seek(Number(e.target.value) / 10000 * tracks[method].at(-1) * unit);};
  byId('jump').onchange = e => {
    if (!e.target.value) return;
    stop(); const i = frames.findIndex(f => f.id === Number(e.target.value));
    if (i >= 0) seek(tracks[method][i] * unit);
    e.target.value = '';
  };
  status.onclick = () => {if (status.textContent.includes('Retry')) update();};
  async function cacheFiles(files,workers,progress,signal){
    const abort=new AbortController();
    const cancel=()=>abort.abort();
    if(signal?.aborted)cancel();
    signal?.addEventListener('abort',cancel,{once:true});
    let next=0,done=0;
    try{
      await Promise.all(Array.from({length:workers},async()=>{
        while(next<files.length){
          const response=await fetch(files[next++],{cache:'force-cache',priority:'low',signal:abort.signal});
          if(!response.ok)throw Error('A frame could not load. Retry the download.');
          // Drain the response into the HTTP cache without retaining a second copy.
          await response.body.pipeTo(new WritableStream(),{signal:abort.signal});
          progress(++done,files.length);
        }
      }));
    }finally{abort.abort();signal?.removeEventListener('abort',cancel);}
  }
  function preloadKey(){return settings.layers==='live'?'live-'+settings.field:'plates';}
  function preloadLabel(){
    const btn=byId('preload');
    if(preloading)return;
    btn.disabled=warmed.has(preloadKey());
    btn.textContent=btn.disabled?'View loaded':'Preload';
  }
  byId('preload').onclick = async () => {
    const layer=settings.layers,key=preloadKey(), btn=byId('preload');
    if(preloading||warmed.has(key))return;
    preloading=true;btn.disabled=true;
    try {
      let files;
      if(layer==='live'){
        const response=await fetch('live/assets.json');if(!response.ok)throw Error('Transfer failed');
        files=(await response.json()).map(path=>'live/'+(settings.field==='fast'?path.replace(/^camera\//,'camera-fast/'):path));
      }else files=Array.from({length:Math.ceil(frames.length/slots)},(_,i)=>'plates/'+i+'.webp');
      await cacheFiles(files,3,(done,total)=>{btn.textContent='Loading '+Math.round(done/total*100)+'%';});
      warmed.add(key);
    }catch{btn.textContent='Retry preload';}
    finally{preloading=false;if(warmed.has(key))preloadLabel();else btn.disabled=false;}
  };
  async function warmTest(ranges,signal,progress){
    const selected=new Set();
    for(const [lo,hi] of ranges){
      const track=tracks[method],a=frameAt(track,lo/unit),b=frameAt(track,hi/unit);
      for(let i=a;i<=b;i++)selected.add(i);
    }
    const files=settings.layers==='live'
      ? byId('motion').contentWindow.studyTestFiles([...selected].map(i=>frames[i].id),settings.field).map(f=>'live/'+f)
      : [...new Set([...selected].map(i=>'plates/'+Math.floor(i/slots)+'.webp'))];
    await cacheFiles(files,4,progress,signal);
  }
  tester=speedTest({seek,stop,warmTest,
    position:id=>tracks[method][indexById.get(id)]*unit,
    visible:()=>settings.layers==='live'?(indexById.get(live.shown)??-1):shown,
    wanted:()=>wanted, distance:index=>tracks[method][index]*unit,
    unavailable:()=>settings.layers==='live'&&live.unavailable,
    layer:()=>settings.layers
  });
  byId('edit').onclick = () => { stop(); byId('notes').showModal(); };
  byId('summary').textContent = frames.length + ' selected images from ' + (frames.at(-1).id + 1) + ' authored positions, F0000–' + label(frames.at(-1).id) + '.';
  for (const [first,last,stride] of edit) {
    const tr = byId('cuts').insertRow();
    tr.insertCell().textContent = first === last ? label(first) : label(first) + '–' + label(last);
    tr.insertCell().textContent = first === last ? 'Opening pose' : stride === 1 ? 'Every frame' : 'Every ' + stride + ' frames';
  }
  const initialFrame=Number(address.searchParams.get('frame'))||0;
  const initial=frames.findIndex(f=>f.id>=initialFrame);
  layout(initial<0?frames.length-1:initial); byId('play').disabled = false;
}
start().catch(() => {status.textContent='Could not load the study. Reload to retry.';});
