// const coordinates = require("./samplePoints.json");
const worldCoordinates = require("./imageToWorld.js");
console.log(worldCoordinates);

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

function findCentroid(coordinates) {
  const n = coordinates.length;

  if (n < 3) {
    throw new Error("A polygon must have at least 3 vertices.");
  }

  let xPrev = 0.0,
    yPrev = 0.0,
    xCurr = 0.0,
    yCurr = 0.0;

  const area = calculateArea(coordinates);
  let Cx = 0;
  let Cy = 0;

  let temp = 0.0;
  let i = 0;
  for (i = 0; i < n - 1; i++) {
    xPrev = coordinates[i][0];
    yPrev = coordinates[i][1];
    xCurr = coordinates[i + 1][0];
    yCurr = coordinates[i + 1][1];
    temp = xPrev * yCurr - xCurr * yPrev;

    Cx += (xPrev + xCurr) * temp;
    Cy += (yPrev + yCurr) * temp;
  }

  Cx = Math.abs(Cx / (6.0 * area));
  Cy = Math.abs(Cy / (6.0 * area));

  return [Cx, Cy];
}

//incomplete
function findNearestEdge(coordinates) {
  const centroid = findCentroid(coordinates);
}

console.log(`${calculateArea(worldCoordinates).toFixed(3)} mm²`);
console.log(findCentroid(worldCoordinates));

// findNearestEdge(coordinates);
