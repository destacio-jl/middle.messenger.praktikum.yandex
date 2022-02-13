const express = require("express");
const path = require("path");

const PORT = 3000;

const app = express();
const port = process.env.PORT || PORT;

const filesDirectory = `${__dirname}/dist`;
app.use(express.static(path.join(__dirname, "dist")));

app.use(function (req, res, next) {
  res.status(404).sendFile(`${filesDirectory}/404.html`);
});

app.listen(port);
