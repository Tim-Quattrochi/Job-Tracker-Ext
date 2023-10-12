const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/constants");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test endpoint");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});
