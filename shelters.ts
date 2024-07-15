import * as fs from "fs";
import * as path from "path";

const sheltersDir = path.join(path.resolve(), "/public/shelters");

let shelters = [];

fs.readdirSync(sheltersDir).map((shelter) => {
  const shelterPath = path.join(sheltersDir, shelter);
  const shelterData = fs.readFileSync(shelterPath, "utf8");
  const response = JSON.parse(shelterData);
  shelters = shelters.concat(response);
});

fs.writeFileSync(
  path.join(path.resolve(), "/public/shelters.json"),
  JSON.stringify(shelters)
);
