const handlebars = require("handlebars");
const fs = require("fs");
const pdf = require("html-pdf");
const express = require("express");

const app = express();

app.get("/", (req, re) => {
  const template = handlebars.compile(
    fs.readFileSync("./template.hbs", "utf-8")
  );

  var result = template({ person: { name: "Fulano", lastName: "de tal" } });

  pdf.create(result).toStream((error, file) => {
    if (!error) {
      file.pipe(re);
    }
  });
});

app.listen(3000);
