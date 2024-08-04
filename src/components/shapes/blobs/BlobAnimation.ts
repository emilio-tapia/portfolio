// import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
// import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

// // our <path> element
// const path = document.querySelector("#animatedPath");
// // used to set our custom property values
// const root = document.documentElement;

// let hueNoiseOffset = 0;
// let noiseStep = 0.005;

// const simplex = new SimplexNoise();

// const points = createPoints();

// (function animate() {
//   path.setAttribute("d", spline(points, 1, true));

//   // for every point...
//   for (let i = 0; i < points.length; i++) {
//     const point = points[i];

//     // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
//     const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
//     const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
//     // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
//     const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
//     const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

//     // update the point's current coordinates
//     point.x = x;
//     point.y = y;

//     // progress the point's x, y values through "time"
//     point.noiseOffsetX += noiseStep;
//     point.noiseOffsetY += noiseStep;
//   }

//   const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
//   const hue = map(hueNoise, -1, 1, 0, 360);

//   root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
//   root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
//   document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

//   hueNoiseOffset += noiseStep;

//   requestAnimationFrame(animate);
// })();

// function createPoints() {
//   const points = [];
//   // Generate points with random noise
//   for (let i = 0; i < 8; i++) {
//     points.push({
//       x: Math.random() * 200,
//       y: Math.random() * 200,
//       originX: Math.random() * 200,
//       originY: Math.random() * 200,
//       noiseOffsetX: Math.random() * 1000,
//       noiseOffsetY: Math.random() * 1000,
//     });
//   }
//   return points;
// }

// function noise(x, y) {
//   return simplex.noise2D(x, y);
// }

// function map(value, inMin, inMax, outMin, outMax) {
//   return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
// }

import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

// Select all <path> elements
const paths = document.querySelectorAll(".animatedpath");
const root = document.documentElement;

let hueNoiseOffset = 100;
let noiseStep = 0.05;

const simplex = new SimplexNoise();

const allPoints = [];

paths.forEach((path, index) => {
  const points = createPoints(path);
  allPoints.push({ path, points });
});

(function animate() {
  allPoints.forEach(({ path, points }) => {
    path.setAttribute("d", spline(points, 1, true));

    points.forEach((point) => {
      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      const x = map(nX, -1, 1, point.originX - 5, point.originX + 5); // Smaller range
      const y = map(nY, -1, 1, point.originY - 5, point.originY + 5); // Smaller range

      point.x = x;
      point.y = y;

      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    });
  });

  requestAnimationFrame(animate);
})();

function map(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function noise(x, y) {
  return simplex.noise2D(x, y);
}

function createPoints(path) {
  const length = path.getTotalLength();
  const numPoints = 200;
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const pointAtLength = path.getPointAtLength((i / (numPoints - 1)) * length);
    points.push({
      x: pointAtLength.x,
      y: pointAtLength.y,
      originX: pointAtLength.x,
      originY: pointAtLength.y,
      noiseOffsetX: Math.random() * 0.1,
      noiseOffsetY: Math.random() * 0.1,
    });
  }

  return points;
}
