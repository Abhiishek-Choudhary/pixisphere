const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/photographers", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading listings file.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
