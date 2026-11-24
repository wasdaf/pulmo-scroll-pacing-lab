/* Shared material for tracers, projected peptide centres and the near-camera layer. */
window.journeyParticles = (() => {
  const material = new Map();
  const clamp = (x, low = 0, high = 1) => Math.max(low, Math.min(high, x));
  const smooth = x => { const t = clamp(x); return t * t * (3 - 2 * t); };
  const mapWidth = 128, mapHeight = 72;
  const maps = new WeakMap();
  const meter = document.createElement('canvas');
  meter.width = mapWidth; meter.height = mapHeight;
  const meterContext = meter.getContext('2d', { willReadFrequently: true });
  function luminance(image) {
    if (!image?.complete || !image.naturalWidth) return null;
    const url = image.currentSrc || image.src;
    const existing = maps.get(image);
    if (existing?.url === url) return existing.data;
    meterContext.clearRect(0, 0, mapWidth, mapHeight);
    meterContext.drawImage(image, 0, 0, mapWidth, mapHeight);
    const rgba = meterContext.getImageData(0, 0, mapWidth, mapHeight).data;
    const data = new Uint8Array(mapWidth * mapHeight);
    for (let i = 0; i < data.length; i++) {
      const j = i * 4;
      data[i] = .2126 * rgba[j] + .7152 * rgba[j + 1] + .0722 * rgba[j + 2];
    }
    maps.set(image, { url, data });
    return data;
  }

  function gradeAt(ctx, x, y) {
    const image = document.getElementById('laterPlate');
    const data = luminance(image.hidden ? document.getElementById('plate') : image);
    if (!data) return 0;
    const u = clamp(x * mapWidth / ctx.canvas.width - .5, 0, mapWidth - 1);
    const v = clamp(y * mapHeight / ctx.canvas.height - .5, 0, mapHeight - 1);
    const i = Math.floor(u), j = Math.floor(v), dx = u - i, dy = v - j;
    const a = j * mapWidth, b = Math.min(j + 1, mapHeight - 1) * mapWidth;
    const k = Math.min(i + 1, mapWidth - 1);
    const luma = ((data[a + i] * (1 - dx) + data[a + k] * dx) * (1 - dy)
      + (data[b + i] * (1 - dx) + data[b + k] * dx) * dy) / 255;
    return smooth((luma - .34) / .38);
  }

  function mixGold(rgb, deep, grade) {
    return rgb.map((value, i) => Math.round(value + (deep[i] - value) * grade)).join(',');
  }

  function sprites(accent, grade) {
    const key = accent ? Math.round(grade * 63) : -1;
    if (material.has(key)) return material.get(key);
    const ball = document.createElement('canvas'), halo = document.createElement('canvas');
    ball.width = ball.height = halo.width = halo.height = 64;
    const ctx = ball.getContext('2d'), glow = halo.getContext('2d');
    const shade = ctx.createRadialGradient(22, 19, 1, 32, 32, 30);
    const stops = accent ? ['#ffe486', '#ffdc53', '#ffd700', '#c99107', '#96650b']
      : ['#f7fffe', '#e2f6f6', '#c4e4ed', '#86bac9', '#618998'];
    const deep = [[178, 109, 21], [151, 85, 12], [123, 64, 8], [95, 47, 5], [72, 31, 3]];
    [0, .22, .52, .84, 1].forEach((at, i) => {
      const rgb = stops[i].slice(1).match(/../g).map(channel => parseInt(channel, 16));
      const color = accent && key ? 'rgb(' + mixGold(rgb, deep[i], key / 63) + ')' : stops[i];
      shade.addColorStop(at, color);
    });
    ctx.fillStyle = shade;
    ctx.beginPath(); ctx.arc(32, 32, 30, 0, 2 * Math.PI); ctx.fill();
    const tint = accent ? mixGold([255, 215, 0], [123, 64, 8], key / 63) : '178,224,241';
    const haze = glow.createRadialGradient(32, 32, 3, 32, 32, 32);
    for (const [stop, opacity] of [[0, .75], [.28, .37], [.6, .09], [1, 0]])
      haze.addColorStop(stop, 'rgba(' + tint + ',' + opacity + ')');
    glow.fillStyle = haze; glow.fillRect(0, 0, 64, 64);
    const result = { ball, halo };
    material.set(key, result);
    return result;
  }

  function sphere(ctx, x, y, radius, opacity, hot, accent) {
    if (opacity < .006 || radius <= 0) return;
    const {ball, halo} = sprites(accent, accent ? gradeAt(ctx, x, y) : 0), alpha = ctx.globalAlpha;
    radius *= 1 + .13 * hot;
    if (hot > .012) {
      const spread = 2.9 * radius + 1.5;
      ctx.globalAlpha = alpha * clamp(opacity * hot * .50);
      ctx.drawImage(halo, x - spread, y - spread, 2 * spread, 2 * spread);
    }
    ctx.globalAlpha = alpha * clamp(opacity);
    ctx.drawImage(ball, x - radius, y - radius, 2 * radius, 2 * radius);
    ctx.globalAlpha = alpha;
  }

  // Each atlas tile spans 5.2 nm. Its transparent margins preserve the projection
  // scale of the source structure. Only shaded views are shipped to the browser.
  const atlas = new Image();
  atlas.src = new URL('peptide-views-v1.png', document.currentScript.src);
  atlas.onload = () => { window.redrawGoldNear?.(); window.refreshPeptideLayers?.(); };
  const extents = [2.21, 2.86, 2.86];
  function peptide(ctx, x, y, field, id, opacity, hot, accent, dot = 1.3, screenRatio = 1) {
    if (!window.showPeptides || !field || opacity < .006) return;
    const tile = Math.abs(Math.trunc(id)) % 6;
    const pxPerNm = ctx.canvas.width * 1e-9 / field;
    const span = pxPerNm * extents[tile % 3];
    const resolved = atlas.complete && atlas.naturalWidth && window.showConformers
      ? smooth((span * screenRatio - 3) / 5) : 0;
    if (resolved < 1) sphere(ctx, x, y, Math.max(dot, span / 2), opacity * (1-resolved), hot, accent);
    if (!resolved) return;
    const size = pxPerNm * 5.2;
    const alpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha * clamp(opacity * resolved);
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(id * 2.39996323);
    ctx.drawImage(atlas, tile * 160, accent ? 0 : 160, 160, 160, -size/2, -size/2, size, size);
    ctx.restore();
    ctx.globalAlpha = alpha;
  }

  // The original packets use nearest grid samples of the 144 x 81 exclusion mask.
  function open(mask, x, y, w, h) {
    if (x < 0 || x > w || y < 0 || y > h) return false;
    const i = Math.round(y / h * 80) * 144 + Math.round(x / w * 143);
    return !(mask[i >> 3] & (1 << (i & 7)));
  }

  // Slide along the authored path at a tissue boundary. Sample the whole move
  // including both side cells at diagonal corners of the exclusion grid.
  function clearMove(mask, x, y, u, v, w, h) {
    if (!mask || !open(mask, x, y, w, h)) return false;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(u) * 288 / w, Math.abs(v) * 162 / h)));
    let lastX = x, lastY = y;
    for (let i = 1; i <= steps; i++) {
      const nextX = x + u * i / steps, nextY = y + v * i / steps;
      if (!open(mask, nextX, nextY, w, h) || !open(mask, nextX, lastY, w, h) || !open(mask, lastX, nextY, w, h)) return false;
      lastX = nextX; lastY = nextY;
    }
    return true;
  }

  function deflect(x, y, tx, ty, mask, focus, w, h, reach, out) {
    out[0] = x; out[1] = y;
    if (!focus[3]) return;
    const dx = x - focus[0] * w, dy = y - focus[1] * h;
    const dist = Math.hypot(dx, dy), radius = focus[2] * h;
    if (!radius || dist >= radius) return;
    const force = focus[3] * smooth(1 - dist / radius) * reach;
    const ux = dx / Math.max(1, dist), uy = dy / Math.max(1, dist);
    const along = ux * tx + uy * ty;
    const ax = force * along * tx, ay = force * along * ty;
    const sx = .62 * ax + .38 * force * ux, sy = .62 * ay + .38 * force * uy;
    if (clearMove(mask, x, y, sx, sy, w, h)) { out[0] += sx; out[1] += sy; }
    else if (clearMove(mask, x, y, ax, ay, w, h)) { out[0] += ax; out[1] += ay; }
  }

  function foreground(canvas, stage, read) {
    const ctx = canvas.getContext('2d');
    const seeds = Array.from({length: 64}, (_, i) => ({
      angle: i * 2.39996323, distance: .20 + .79 * ((i * .41421356 + .31) % 1),
      depth: (i * .75487767 + .21) % 1, speed: .17 + .15 * ((i * .61803399) % 1)
    }));
    // Successive depth planes enter near the vanishing point, move past the
    // camera, and disappear offscreen. Their positions depend only on the
    // camera footprint, so seeking or reversing follows the identical paths.
    const rays = Array.from({length: 336}, (_, i) => ({
      phase: (i*.754877666 + .41) % 1, rank: ((i+1)*.569840291) % 1,
      x: 2.15 * (((i+.5)*.618033989 % 1)*2-1),
      y: 2.15 * (((i+.5)*.414213562 % 1)*2-1)
    }));
    let visible = false, request = 0, last = 0, clock = 0, lastTravel = NaN;
    function queue() {
      if (!request && visible && !document.hidden) request = requestAnimationFrame(draw);
    }
    function draw(now) {
      request = 0;
      const state = read();
      if (!state.enabled) { canvas.hidden = true; last = 0; return; }
      if (last && now - last < 1000 / 30 && state.travel === lastTravel) { queue(); return; }
      if (state.animate && last) clock += Math.min(.065, (now - last) / 1000);
      last = now; lastTravel = state.travel;
      canvas.hidden = false;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const focus = state.focus;
      const distal = smooth((state.frame - 396) / 38);
      if (distal) {
        const count = state.full ? rays.length : 188;
        const screenRatio = stage.clientWidth / w;
        const cx = state.aim[0], cy = state.aim[1];
        for (let i=0;i<count;i++) {
          const ray=rays[i], cycle=ray.phase+state.travel/3;
          const t=cycle-Math.floor(cycle), station=2**(3*(t-1));
          const depth=1-station, scale=station/depth;
          const x=w*(cx+ray.x*scale), y=h*(cy+ray.y*scale);
          if(x < -32 || x > w+32 || y < -32 || y > h+32) continue;
          const fade=smooth(t/.15)*smooth(depth/.13);
          // The resolved silhouettes occupy real screen area. Thin the illustrative
          // foreground continuously as the field narrows around the landing sites.
          const span = w * 2.6e-9 / (state.width*depth) * screenRatio;
          const keep = 1/(1+(span/16)**2);
          const population = 1-smooth((ray.rank-keep*.70)/(.30*keep));
          const alpha=distal*fade*population*state.strength*(.75+.25*station);
          const hot=state.glow && focus[3] ? focus[3]*smooth(1-Math.hypot(x-focus[0]*w,y-focus[1]*h)/(focus[2]*h)) : 0;
          const dot=(1.40+1.65*station)/screenRatio;
          peptide(ctx,x,y,state.width*depth,i+Math.abs(Math.floor(cycle))*17,alpha,hot,state.accent,dot,screenRatio);
        }
      }
      const count = state.full ? seeds.length : 36;
      for (let i = 0; i < count && distal < 1; i++) {
        const s = seeds[i], cycle = s.depth + state.travel * s.speed;
        const z = cycle - Math.floor(cycle), zoom = .30 * 2 ** (3.12 * z);
        const angle = s.angle + .36 * Math.floor(cycle);
        const opacity = smooth(z / .17) * smooth((1 - z) / .23) * state.strength * (.29 + .37 * z);
        const r = (.90 + .32 * s.depth) * zoom;
        let x = w * (.5 + .67 * s.distance * Math.cos(angle) * zoom) + Math.sin(clock * .26 + s.angle) * (1.3 + 2.2 * z);
        let y = h * (.5 + .71 * s.distance * Math.sin(angle) * zoom) + Math.cos(clock * .21 + s.angle) * (1.1 + 1.8 * z);
        if (x < -12 || x > w + 12 || y < -12 || y > h + 12) continue;
        const dx = x - focus[0] * w, dy = y - focus[1] * h, dist = Math.hypot(dx, dy);
        const near = focus[3] ? smooth(1 - dist / (focus[2] * h)) * focus[3] : 0;
        const push = near * (4 + 10 * z) / Math.max(1, dist);
        x += dx * push; y += dy * push;
        sphere(ctx, x, y, r, opacity*(1-distal), state.glow ? near : 0, state.accent);
      }
      if (state.animate) queue();
    }
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) queue(); else { cancelAnimationFrame(request); request = 0; last = 0; }
    }).observe(stage);
    document.addEventListener('visibilitychange', () => { last = 0; queue(); });
    return queue;
  }

  return { sphere, peptide, deflect, foreground, luminance, mapWidth, mapHeight, gradeAt, mixGold };
})();
