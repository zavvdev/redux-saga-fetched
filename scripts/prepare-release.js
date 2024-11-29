import fs from "fs";

fs.copyFile("README.md", "./dist/README.md", (err) => {
  if (err) throw err;
  console.log("REAME.md was copied to dist folder");
});

fs.copyFile("./src/index.d.ts", "./dist/index.d.ts", (err) => {
  if (err) throw err;
  console.log("index.d.ts was copied to dist folder");
  console.log("-----------------------------");
  console.log("UPDATE THE VERSION IN package.json");
});
