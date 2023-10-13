const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobDetailsRouter = require("./routes/jobDetails.routes");
const userRouter = require("./routes/user.routes");
const { PORT } = require("./config/constants");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/details", jobDetailsRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});
