const {Client} = require('pg')
const env = require("dotenv")
env.config()


const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT

})
client.connect()

console.log("Connected To The Database")

module.exports = {databaseObject: client}