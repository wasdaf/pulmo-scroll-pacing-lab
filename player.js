import {methods, buildTracks, frameAt} from './pacing.js';
import {setupSettings} from './settings.js';
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
  const canvas = byId('picture'), ctx = canvas.getContext('2d', {alpha:false});
  const slots = size.rows * size.columns;
  const cache = new Map();
  let unit = document.documentElement.clientHeight, wanted = 0, shown = -1, direction = 1;
  let playing = false, playHandle = 0, previousTime = 0, playY = 0;
  let paintQueued = false, warmed = false;
  let live, liveNotice='';
  const settings = setupSettings(address,key=>{
    if(['travel','lungTravel','bilayerTravel','reset'].includes(key)){tracks=buildTracks(frames,settings);layout(visibleIndex());}
    live.sync(); refreshLabel(); 
  },()=>frames[visibleIndex()].id);
  function visibleIndex(){
    const id=live?.shown??-1;
    return id>=0?frames.findIndex(f=>f.id===id):Math.max(0,shown);
  }
  function refreshLabel(){
    const id=frames[visibleIndex()].id;
    byId('frameText').textContent=label(id);
    byId('chapterText').textContent=chapters.filter(ch=>ch[0]<=id).at(-1)[1];
    status.textContent=settings.layers==='live'?liveNotice:'';
  }
  tracks=buildTracks(frames,settings);
  live=liveView(byId('motion'),settings,(_,notice)=>{liveNotice=notice;refreshLabel();});
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
  function paint() {
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
    wanted = next;
    live.seek(frames[next].id);
    const progress = Math.max(0, Math.min(1, distance / track.at(-1)));
    byId('timeline').value = Math.round(progress * 10000);
    byId('percent').value = Math.round(progress * 100) + '%';
    paint();
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
    if (previousTime && wanted === shown && !live.waiting) playY += Math.min(0.05, (now - previousTime) / 1000) * document.documentElement.clientHeight*settings.auto;
    previousTime = now;
    seek(playY);
    if (wanted === frames.length - 1 && wanted === shown && !live.waiting) {stop(); return;}
    playHandle = requestAnimationFrame(tick);
  }
  byId('play').onclick = () => {
    if (playing) {stop(); return;}
    if (wanted === frames.length - 1) seek(0);
    playing = true; previousTime = 0; playY = scrollY;
    byId('play').textContent = 'Pause'; byId('play').setAttribute('aria-pressed','true');
    playHandle = requestAnimationFrame(tick);
  };
  window.addEventListener('scroll', () => {if (!paintQueued) {paintQueued=true; requestAnimationFrame(update);}}, {passive:true});
  for (const event of ['wheel','touchstart','keydown']) window.addEventListener(event, stop, {passive:true});
  window.addEventListener('resize', () => {stop(); layout(wanted);});
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
  byId('preload').onclick = async () => {
    if (warmed) return;
    const btn = byId('preload'), files=Array.from({length:Math.ceil(frames.length/slots)},(_,i)=>'plates/'+i+'.webp');
    if(settings.layers==='live'){
      try{const response=await fetch('live/assets.json');if(!response.ok)throw Error();files.push(...(await response.json()).map(x=>'live/'+x));}
      catch{btn.textContent='Retry preload';return;}
    }
    const total=files.length;
    btn.disabled = true; let next = 0, done = 0;
    try {
      await Promise.all(Array.from({length:3}, async () => {
        while(next < total) {
          const r = await fetch(files[next++], {cache:'force-cache'});
          if (!r.ok) throw Error('Transfer failed');
          await r.arrayBuffer(); btn.textContent = 'Loading ' + Math.round(++done / total * 100) + '%';
        }
      }));
      warmed = settings.layers==='live';btn.disabled=warmed; btn.textContent = warmed?'Study loaded':'Plates loaded';
    } catch { btn.disabled=false; btn.textContent='Retry preload'; }
  };
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
