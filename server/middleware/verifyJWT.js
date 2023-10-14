// this middleware verifies the json web token that is attached to the request header.
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/constants");

const verifyJWT = async (req, res, next) => {
  if (req.headers.authorization) {
    const header =
      req.headers.authorization || req.headers.Authorization;

    if (!header?.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = header.split(" ")[1];

    try {
      jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: "Forbidden." });
        } else {
          req.user = {
            id: decoded.id,
            email: decoded.email,
          };

          next();
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden." });
    }
  }
};

module.exports = verifyJWT;
