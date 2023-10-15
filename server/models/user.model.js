const sql = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  APP_NAME,
} = require("../config/constants");

class User {
  constructor(userDetails) {
    this.name = userDetails.name;
    this.email = userDetails.email;
    this.password = userDetails.password;
    this.refresh_token = userDetails.refresh_token;
  }

  static create(newUser, result) {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }
      result(null, {
        id: res.insertId,
        ...newUser,
      });
    });
  }

  static login(email, password, result) {
    sql.query(
      `SELECT * FROM users WHERE email = ?`,
      email,
      async (err, res) => {
        if (err) {
          return result(err, null);
        }
        if (res.length === 0) {
          return result({ message: "No user found." }, null);
        } else if (res.length) {
          //if there is a user found, we will check the password against the db.
          const doesPasswordMatch = await bcrypt.compare(
            password,
            res[0].password
          );
          if (doesPasswordMatch) {
            //password matches, send user minus the password hash.
            delete res[0].password;
            return result(null, res[0]);
          }
        }
      }
    );
  }

  static async hashPassword(password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      throw new Error("hashing failed", error);
    }
  }

  static createAccessToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_EXPIRES_IN,
    });
    return accessToken;
  }

  static createRefreshToken(payload) {
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
    return refreshToken;
  }

  static saveRefreshToken(userId, refreshToken) {
    sql.query(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refreshToken, userId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
        }
      }
    );
    return refreshToken;
  }

  static createCookie(token, response) {
    return response.cookie(APP_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
  }

  /**
   * @description This method will verify the refresh token and create a new access token.
   * @param {string} refreshToken - the refresh token from the client.
   * @param {object} res - the response object from the refresh controller
   * @param {function} result - the callback function to send the new access token to the client.
   */
  static refreshUserToken(refreshToken, res, result) {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return result(err, null);
      }

      //verify the provided refresh token matches the one in the db.
      sql.query(
        "SELECT refresh_token FROM users WHERE id = ?",
        [decoded.id],
        (err, dbRes) => {
          console.log(dbRes);
          console.log(refreshToken);
          console.log(err);
          if (err) {
            return result(err, null);
          }
          if (dbRes.length === 0) {
            return result({ message: "No user found." }, null);
          } else if (dbRes.length) {
            if (dbRes[0].refresh_token !== refreshToken) {
              return result(
                { message: "Refresh token does not match." },
                null
              );
            }
          }
        }
      );

      const newRefreshToken = User.createRefreshToken({
        id: decoded.id,
        email: decoded.email,
      });

      // //replace the refresh token in the db.
      User.saveRefreshToken(decoded.id, newRefreshToken);

      User.createCookie(newRefreshToken, res);

      //create a new access token in exchange for the refresh token.
      const newAccessToken = User.createAccessToken({
        id: decoded.id,
        email: decoded.email,
      });
      console.log("new access token: ", newAccessToken);
      return result(null, newAccessToken);
    });
  }
}

module.exports = User;
