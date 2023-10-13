const userRouter = require("express").Router();
const user = require("../controllers/user.controller");

userRouter.post("/register", user.registerUser);

module.exports = userRouter;
