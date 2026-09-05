/**
 * Simplify public/data/kenya-4.geojson for mobile.
 *
 * The source file is ~2 MB of full-resolution coastline (Coast province alone
 * carries 40k of the 54k points) fetched on the client before Question 1 can be
 * answered. At the sizes this map actually renders — 260-600 CSS px wide — that
 * detail is far below one pixel.
 *
 * Ramer-Douglas-Peucker per ring, then coordinate rounding. Region names, ids
 * and topology are preserved so map-section.tsx needs no changes.
 *
 * The 2 MB source is no longer tracked (nothing loaded it at runtime once the
 * minified file existed). To regenerate, restore it first:
 *
 *   git show <commit-before-removal>:public/data/kenya-4.geojson > public/data/kenya-4.geojson
 *   node scripts/simplify-geojson.mjs [tolerance] [decimals]
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const SRC = "public/data/kenya-4.geojson";
const OUT = "public/data/kenya-4.min.geojson";

const tolerance = Number(process.argv[2] ?? 0.006);
const decimals = Number(process.argv[3] ?? 4);

const perpendicularDistance = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax;
  const dy = by - ay;
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
  const t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy);
  const cx = ax + Math.max(0, Math.min(1, t)) * dx;
  const cy = ay + Math.max(0, Math.min(1, t)) * dy;
  return Math.hypot(px - cx, py - cy);
};

const douglasPeucker = (points, epsilon) => {
  if (points.length <= 2) return points;
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const d = perpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist <= epsilon) return [points[0], points[points.length - 1]];
  return [
    ...douglasPeucker(points.slice(0, index + 1), epsilon).slice(0, -1),
    ...douglasPeucker(points.slice(index), epsilon),
  ];
};

const round = (n) => Number(n.toFixed(decimals));

/** A ring must keep at least 4 points (3 distinct + closure) to stay a polygon. */
const simplifyRing = (ring) => {
  const simplified = douglasPeucker(ring, tolerance).map(([x, y]) => [
    round(x),
    round(y),
  ]);
  if (simplified.length < 4) return null;
  const [fx, fy] = simplified[0];
  const [lx, ly] = simplified[simplified.length - 1];
  if (fx !== lx || fy !== ly) simplified.push([fx, fy]);
  return simplified;
};

const simplifyPolygon = (polygon) => {
  const rings = polygon.map(simplifyRing).filter(Boolean);
  return rings.length ? rings : null;
};

if (!existsSync(SRC)) {
  console.error(
    `${SRC} is not in the working tree — restore it from git history first ` +
      `(see the header comment). The minified output is what ships.`
  );
  process.exit(1);
}

const source = JSON.parse(readFileSync(SRC, "utf8"));

let before = 0;
let after = 0;
const countPoints = (coords) =>
  Array.isArray(coords[0]) ? coords.reduce((n, c) => n + countPoints(c), 0) : 1;

const features = source.features.map((feature) => {
  before += countPoints(feature.geometry.coordinates);

  const { type, coordinates } = feature.geometry;
  let next;
  if (type === "Polygon") {
    next = simplifyPolygon(coordinates);
  } else if (type === "MultiPolygon") {
    next = coordinates.map(simplifyPolygon).filter(Boolean);
    if (!next.length) next = null;
  } else {
    throw new Error(`Unsupported geometry: ${type}`);
  }

  if (!next) throw new Error(`Region "${feature.name}" simplified away entirely`);
  after += countPoints(next);

  return {
    type: "Feature",
    id: feature.id,
    name: feature.name,
    properties: feature.properties,
    geometry: { type, coordinates: next },
  };
});

writeFileSync(
  OUT,
  JSON.stringify({ type: "FeatureCollection", features })
);

const sizeOf = (p) => (readFileSync(p).length / 1024).toFixed(0);
console.log(`regions:  ${features.length}`);
console.log(`points:   ${before} -> ${after}`);
console.log(`size:     ${sizeOf(SRC)} KB -> ${sizeOf(OUT)} KB`);
console.log(`written:  ${OUT}`);
