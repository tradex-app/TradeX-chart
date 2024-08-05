const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "..", "demo", "tradex-chart.es.js");
const destPath = path.join(
  __dirname,
  "node_modules",
  "tradex-chart",
  "dist",
  "tradex-chart.es.js",
);

fs.copyFileSync(srcPath, destPath);
