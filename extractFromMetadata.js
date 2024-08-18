const fs = require("fs");

const metadataText = fs.readFileSync("./dicom_metadata.txt", "utf8");

function extractMetadata(text) {
  const refPixelX0Regex = /Reference Pixel X0\s+SL:\s+([-+]?\d*\.?\d+)/;
  const refPixelY0Regex = /Reference Pixel Y0\s+SL:\s+([-+]?\d*\.?\d+)/;
  const physDeltaXRegex = /Physical Delta X\s+FD:\s+([-+]?\d*\.?\d+)/;
  const physDeltaYRegex = /Physical Delta Y\s+FD:\s+([-+]?\d*\.?\d+)/;

  const refPixelX0Match = text.match(refPixelX0Regex);
  const refPixelY0Match = text.match(refPixelY0Regex);
  const physDeltaXMatch = text.match(physDeltaXRegex);
  const physDeltaYMatch = text.match(physDeltaYRegex);

  return {
    refPixelX0: refPixelX0Match ? parseFloat(refPixelX0Match[1]) : null,
    refPixelY0: refPixelY0Match ? parseFloat(refPixelY0Match[1]) : null,
    physDeltaX: physDeltaXMatch ? parseFloat(physDeltaXMatch[1]) : null,
    physDeltaY: physDeltaYMatch ? parseFloat(physDeltaYMatch[1]) : null,
  };
}

const metadataValues = extractMetadata(metadataText);

module.exports = metadataValues;

// console.log("Extracted Metadata Values:");
// console.log(`Reference Pixel X0: ${metadataValues.refPixelX0}`);
// console.log(`Reference Pixel Y0: ${metadataValues.refPixelY0}`);
// console.log(`Physical Delta X: ${metadataValues.physDeltaX}`);
// console.log(`Physical Delta Y: ${metadataValues.physDeltaY}`);
