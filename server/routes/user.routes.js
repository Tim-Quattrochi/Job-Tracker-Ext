const userRouter = require("express").Router();
const user = require("../controllers/user.controller");
const verifyJWT = require("../middleware/verifyJWT");

// /api/user
userRouter.get("/auth/refresh", user.refresh);
userRouter.post("/register", user.registerUser);
userRouter.post("/login", user.loginUser);

module.exports = userRouter;
