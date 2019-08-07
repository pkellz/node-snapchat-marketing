require('dotenv').config()

module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN
};
