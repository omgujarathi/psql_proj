const {Client} = require('pg')


const clientDatabaseConfig = {
    user: 'postgres', host: 'localhost', database: 'sql_playground', password: 'aaa', port: 5432
}


const client = new Client(clientDatabaseConfig)
client.connect()

console.log("Connected To The Database")

module.exports = {databaseObject: client}