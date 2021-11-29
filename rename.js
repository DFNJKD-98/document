const fs = require("fs");
const path = require("path");
const basePath = "E:/demo/webDemo/docsify_cli/mdFile";

let content = "";

fs.readdir(basePath, (err, files) => {
  if (err) {
    console.log("err: ", err);
  } else {
    files.forEach((file) => {
      let st = fs.lstatSync(basePath + "/" + file);
      if (st.isFile()) {
        let name = path.basename(basePath + "/" + file, ".md");
        if (name != "_sidebar") {
          content += `- [${name}](mdFile/${file})\n`;
        }
      }
    });
    console.log(content);
    fs.writeFile("./_sidebar.md", content, (err) => {
      if (err) throw err;
      console.log("save file is successfully!");
    });
  }
});
