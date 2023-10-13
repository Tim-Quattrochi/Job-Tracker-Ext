const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const APP_NAME = process.env.APP_NAME;

module.exports = {
  PORT,
  HOST,
  USER_NAME,
  PASSWORD,
  DB_NAME,
  ACCESS_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  APP_NAME,
};
