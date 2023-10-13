const userRouter = require("express").Router();
const user = require("../controllers/user.controller");

userRouter.post("/register", user.registerUser);
userRouter.post("/login", user.loginUser);

module.exports = userRouter;
