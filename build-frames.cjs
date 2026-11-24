// node build-frames.cjs /path/to/published-viewer /path/to/sharp
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const sharp = require(process.argv[3] || 'sharp');
const source = path.resolve(process.argv[2]);
const root = __dirname;
const read = name => fs.readFile(path.join(source, name));
// First and last IDs are always included. Shared endpoints appear once.
const edit = [
  [0, 0, 1], [73, 95, 2], [96, 174, 1], [174, 250, 3],
  [250, 350, 5], [350, 396, 2], [396, 550, 1], [550, 650, 2],
  [650, 825, 3], [825, 900, 2], [900, 956, 4], [956, 1084, 1],
];
const size = { width: 960, height: 540, columns: 3, rows: 2 };
async function build() {
  const html = await read('index.html');
  const calibration = JSON.parse(html.toString().match(/window\.gasScale=(\[.*?\]);/s)[1]);
  const { index } = JSON.parse(await read('journey-current.json'));
  const later = new Map(JSON.parse(await read(index)).map(row => [row[0], row]));
  const release = JSON.parse(await read('download-manifest.json'));
  const receipts = new Map(release.files.map(row => [row.path, row.sha256]));
  const selected = new Set();
  for (const [start, end, stride] of edit) {
    for (let id = start; id <= end; id += stride) selected.add(id);
    selected.add(end);
  }
  const frames = [];
  const plates = path.join(root, 'plates');
  await fs.mkdir(plates, { recursive: true });
  let tiles = [];
  for (const id of selected) {
    const key = String(id).padStart(4, '0');
    const file = id < 397 ? 'plates/' + key + '.jpg' : id <= 446 ? 'volume/' + key + '-ct.webp' : later.get(id)[1];
    const width = (id <= 446 ? calibration[id] : later.get(id)[2])[0];
    const data = await read(file);
    if (receipts.get(file) !== createHash('sha256').update(data).digest('hex')) throw Error('Frame receipt mismatch at ' + id);
    if (!(width > 0)) throw Error('Missing calibrated width at ' + id);
    const tile = await sharp(data).resize(size.width, size.height, {fit: 'contain', background: '#101111'}).png().toBuffer();
    tiles.push({input: tile, left: (tiles.length % size.columns) * size.width, top: Math.floor(tiles.length / size.columns) * size.height});
    frames.push({id, width, source: file});
    if (tiles.length === size.columns * size.rows || frames.length === selected.size) {
      const page = Math.floor((frames.length - 1) / (size.columns * size.rows));
      await sharp({create: {width: size.width * size.columns, height: size.height * size.rows, channels: 3, background: '#101111'}})
        .composite(tiles).webp({quality: 86, effort: 3}).toFile(path.join(plates, page + '.webp'));
      tiles = [];
    }
  }
  const manifest = {release: release.revision, index, sourceBase: 'https://pulmo-p2-staging.netlify.app/pulmo/review-v055/', size, edit, frames};
  await fs.writeFile(path.join(root, 'cut.json'), JSON.stringify(manifest));
  console.log(frames.length + ' verified plates across ' + Math.ceil(frames.length / 6) + ' sheets');
}
build().catch(error => { console.error(error); process.exitCode = 1; });
