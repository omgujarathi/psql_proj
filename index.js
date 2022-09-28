var express = require('express')
var router = require('./routes')
const { Pool, Client } = require('pg')


app = express()
app.use('', router)

const client = new Client({
    user: 'mayurkidi',
    host: 'localhost',
    database: 'sql_playground',
    password: '01001000',
})

client.connect().then(() => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("server started")
})