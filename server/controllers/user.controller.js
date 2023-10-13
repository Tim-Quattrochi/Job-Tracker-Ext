const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "please fill out all required fields" });
  }

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
};

module.exports = { registerUser };
