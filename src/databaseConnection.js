const{Pool,Client} = require('pg')

const poolDatabaseConfig = {
    user : "postgres",
    host : "localhost",
    database :"sql_playground",
    password:'aaa',
    port:5432
}

const pool = new Pool(poolDatabaseConfig)

const clientDatabaseConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'sql_playground',
    password: 'aaa',
    port: 5432
}


const client= new Client(clientDatabaseConfig)
client.connect()

console.log("Connected To The Database")

module.exports={databaseObject : client}