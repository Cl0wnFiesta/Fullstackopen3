require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.DATABASE_URL
console.log('port on ?? ', PORT)
module.exports = {
  MONGODB_URI,
  PORT
}