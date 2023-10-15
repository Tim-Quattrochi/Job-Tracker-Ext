const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const jobDetailsRouter = require("./routes/jobDetails.routes");
const userRouter = require("./routes/user.routes");
const { PORT } = require("./config/constants");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173/", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/details", jobDetailsRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});
