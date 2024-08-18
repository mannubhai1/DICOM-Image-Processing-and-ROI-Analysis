const points = require("./worldCoordinates.json");

function calculateArea(vertices) {
  let area = 0;
  const n = vertices.length;

  for (let i = 0; i < n; i++) {
    let x1 = vertices[i][0];
    let y1 = vertices[i][1];
    let x2 = vertices[(i + 1) % n][0];
    let y2 = vertices[(i + 1) % n][1];

    area += x1 * y2 - y1 * x2;
  }

  return Math.abs(area) / 2;
}

function calculateCentroid(coords) {
  const numPoints = coords.length;
  let xSum = 0;
  let ySum = 0;

  coords.forEach((point) => {
    xSum += point[0];
    ySum += point[1];
  });

  return [xSum / numPoints, ySum / numPoints];
}

function bisectPolygon(polygon) {
  const n = polygon.length;
  let bestArea = Infinity;
  let bestLine = null;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const line = [polygon[i], polygon[j]];
      const area = findBisectingPoint(polygon, line);

      if (Math.abs(area) < Math.abs(bestArea)) {
        bestArea = area;
        bestLine = line;
      }
    }
  }

  return bestLine;
}

function findBisectingPoint(polygon, line) {
  let left = 0;
  let right = 1;
  const totalArea = calculateArea(polygon);
  const epsilon = 1e-6;

  while (right - left > epsilon) {
    const mid = (left + right) / 2;
    const point = interpolate(line[0], line[1], mid);
    const area = splitPolygonArea(polygon, line[0], point);

    if (area < totalArea / 2) {
      left = mid;
    } else {
      right = mid;
    }
  }

  return (
    splitPolygonArea(polygon, line[0], interpolate(line[0], line[1], left)) -
    totalArea / 2
  );
}

function interpolate(p1, p2, t) {
  return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
}
function splitPolygonArea(polygon, p1, p2) {
  const n = polygon.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const intersection = lineIntersection(p1, p2, polygon[i], polygon[j]);

    if (intersection) {
      area += triangleArea(p1, polygon[i], intersection);
      area += triangleArea(p1, intersection, polygon[j]);
    } else {
      area += triangleArea(p1, polygon[i], polygon[j]);
    }
  }

  return Math.abs(area);
}

function lineIntersection(p1, p2, p3, p4) {
  const d =
    (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  if (d === 0) return null;

  const t =
    ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) / d;
  const u =
    -((p1[0] - p2[0]) * (p1[1] - p3[1]) - (p1[1] - p2[1]) * (p1[0] - p3[0])) /
    d;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
  }

  return null;
}

function triangleArea(p1, p2, p3) {
  return Math.abs(
    (p1[0] * (p2[1] - p3[1]) +
      p2[0] * (p3[1] - p1[1]) +
      p3[0] * (p1[1] - p2[1])) /
      2
  );
}

// Check if the first and last points are the same
if (
  points[0][0] !== points[points.length - 1][0] ||
  points[0][1] !== points[points.length - 1][1]
) {
  points.push(points[0]);
}

const centroid = calculateCentroid(points);

const polygon = points;
const bisectingLine = bisectPolygon(polygon);
const distance = Math.sqrt(
  Math.pow(bisectingLine[0][0] - bisectingLine[1][0], 2) +
    Math.pow(bisectingLine[0][1] - bisectingLine[1][1], 2)
);

console.log("Area:", calculateArea(points));
console.log("Centroid:", centroid);
console.log("Bisecting line:", bisectingLine);
console.log("Distance:", distance);
