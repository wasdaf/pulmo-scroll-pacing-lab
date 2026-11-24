export const methods = {
  even: 'Equal scroll per selected frame. Total travel matches the ¾-screen log version.',
  log: '¾ screen per doubling of magnification. A small travel allowance carries nearly stationary shots.',
  relaxed: '1 screen per doubling. The same curve as Log · ¾ screen with a longer scroll.',
  detail: '¾ screen per doubling, with ¼ screen across the lung detail and extra travel through the bilayer approach.',
};
export function buildTracks(frames,weights={}) {
  const log = [0], detail = [0];
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1], b = frames[i];
    const stops = Math.abs(Math.log2(a.width / b.width));
    const distance = Math.max(0.75 * stops, 0.0025);
    log.push(log[i - 1] + distance);
    let emphasis = distance;
    if (a.id >= 250 && b.id <= 350) emphasis = 0.25 * (b.id - a.id) / 100;
    if (a.id >= 1050 && b.id <= 1074) emphasis *= 1.5;
    detail.push(detail[i - 1] + emphasis);
  }
  const tracks={log, relaxed: log.map(d => d * 4 / 3), detail,
    even: frames.map((_, i) => i * log.at(-1) / (frames.length - 1))};
  for(const track of Object.values(tracks)){
    let original=0, distance=0;
    for(let i=1;i<track.length;i++){
      const segment=track[i]-original;original=track[i];
      const start=frames[i-1].id,end=frames[i].id;
      const weight=start>=250&&end<=350?weights.lungTravel:start>=1050&&end<=1074?weights.bilayerTravel:1;
      distance+=segment*(weight??1);track[i]=distance;
    }
  }
  return tracks;
}
export function frameAt(track, distance) {
  let lo = 0, hi = track.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (distance > (track[mid] + track[mid + 1]) / 2) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
