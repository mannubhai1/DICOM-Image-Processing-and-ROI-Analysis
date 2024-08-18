const fs = require("fs");

const metadataValues = require("./scripts/extractFromMetadata");
const pixelPoints = require("./public/pixelPoints.json");
console.log(pixelPoints[1]);
// console.log(metadataValues);

function pixelToWorld(
  xImg,
  yImg,
  refPixelX0,
  refPixelY0,
  physDeltaX,
  physDeltaY
) {
  const xWorld = refPixelX0 + (xImg - refPixelX0) * physDeltaX;
  const yWorld = refPixelY0 + (yImg - refPixelY0) * physDeltaY;

  return { xWorld, yWorld };
}

const { refPixelX0, refPixelY0, physDeltaX, physDeltaY } = metadataValues;

let worldCoordinates = [];
for (let i = 0; i < pixelPoints.length; i++) {
  const [xImg, yImg] = pixelPoints[i];
  // console.log(xImg, yImg);
  const { xWorld, yWorld } = pixelToWorld(
    xImg,
    yImg,
    refPixelX0,
    refPixelY0,
    physDeltaX,
    physDeltaY
  );
  worldCoordinates.push([xWorld, yWorld]);
}

console.log(worldCoordinates[worldCoordinates.length - 1]);
// store these world coordinates in a json file
fs.writeFileSync("worldCoordinates.json", JSON.stringify(worldCoordinates));
module.exports = worldCoordinates;
