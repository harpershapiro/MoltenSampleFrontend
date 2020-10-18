var config = {};

//const DEV_API_PATH = "http://localhost:4000/molten"
//const PROD_API_PATH = ""
console.log(process.env.API_PATH)
config.API_PATH = (process.env.NODE_ENV==="development" ? "http://localhost:4000/molten" : process.env.API_PATH)

module.exports = config;