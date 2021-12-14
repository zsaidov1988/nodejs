const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("SEND");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server...");
})