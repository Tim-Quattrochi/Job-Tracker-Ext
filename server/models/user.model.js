const sql = require("../config/db");
const bcrypt = require("bcrypt");

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
        result(err, null);
        return;
      }
      result(null, {
        id: res.insertId,
        ...newUser,
      });
    });
  }

  static async hashPassword(password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      throw new Error("hashing failed", error);
    }
  }
}

module.exports = User;
