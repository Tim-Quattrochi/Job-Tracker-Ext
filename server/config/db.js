const mysql = require("mysql");
const { PASSWORD, HOST, USER_NAME, DB_NAME } = require("./constants");

const connection = mysql.createConnection({
  host: HOST,
  user: USER_NAME,
  password: PASSWORD,
  database: DB_NAME,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
