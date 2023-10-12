const mysql = require("mysql");
const dbConfig = require("./db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER_NAME,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB_NAME,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
