const { APP_NAME } = require("../config/constants");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "please fill out all required fields" });
  }
  try {
    const newPasswordHash = await User.hashPassword(confirmPassword);

    const userDetails = new User({
      name,
      email,
      password: newPasswordHash,
    });

    //saving to db.
    User.create(userDetails, (err, user) => {
      if (err) {
        res.status(500).json({
          message:
            err.message ||
            "An error occurred while creating the job details",
        });
      } else {
        //send back the user minus the password.
        delete user.password;

        //create the access token and payload to send in response.
        const payload = { id: user.id, email: user.email };
        const accessToken = User.createAccessToken(payload);

        res.status(201).json({ user: { ...user, accessToken } });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "please fill out all required fields" });

  try {
    User.login(email, password, async (err, user) => {
      if (err?.message === "No user found.") {
        return res
          .status(401)
          .json({ message: "Check credentials." });
      } else if (err) {
        return res.status(500).json({
          message:
            err.message || "An error occurred while signing in.",
        });
      } else {
        //create the access token and payload to send in response.
        const payload = { id: user.id, email: user.email };
        const accessToken = User.createAccessToken(payload);
        const refreshToken = User.createRefreshToken(payload);

        //save the refresh token to the db.
        User.saveRefreshToken(user.id, refreshToken);

        //send the http only cookie.
        User.createCookie(refreshToken, res);

        //delete sensitive data from response to client.

        delete user.refresh_token;

        res.status(200).json({ user: { ...user, accessToken } });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const refresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies[APP_NAME]) {
      return res
        .status(401)
        .json({ message: "Refresh Token not found in cookies." });
    }

    const refreshTokenFromCookie = cookies[APP_NAME];

    User.refreshUserToken(
      refreshTokenFromCookie,
      res,
      (err, accessToken) => {
        if (err) {
          return res.status(401).json({ message: err.message });
        } else {
          return res.status(200).json({ accessToken });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, refresh };
