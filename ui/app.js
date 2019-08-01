const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

setInterval(function() {
    http.get("http://axpr-timelock.herokuapp.com");
}, 300000);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000);