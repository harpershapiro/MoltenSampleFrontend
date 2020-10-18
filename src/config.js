require('dotenv').config()
console.log("Loaded env var API_PATH: " + process.env.API_PATH)
var config = {};

//const DEV_API_PATH = "http://localhost:4000/molten"
//const PROD_API_PATH = ""
config.API_PATH = (process.env.NODE_ENV==="development" ? "http://localhost:4000/molten" : process.env.API_PATH)

module.exports = config;