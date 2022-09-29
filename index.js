// <<<<<<< HEAD
// const express = require("express")
// const {databaseObject} = require("./models/database")
// const app = express()
// const port = 8080;


// app.get("/",(req,res)=>{
//         databaseObject.query("select * from users",(err,databaseRes)=>{
//             res.send(databaseRes.rows);
//         })
// })



// app.listen(port,()=>{
//     console.log("Listening on port",port)});
// =======
var express = require('express')
var router = require('./routes')
// const { Pool, Client } = require('pg')

app = express()
app.use('', router)

// const client = new Client({
//     user: 'mayurkidi',
//     host: 'localhost',
//     database: 'sql_playground',
//     password: '01001000',
// })

// client.connect().then(() => {
//     console.log("DB Connected")
// }).catch((err) => {
//     console.log(err)
// })

app.listen(3000, () => {
    console.log("server started")
})

// module.exports = client
// >>>>>>> e7b794625db322a9b71f8ec7c50d915db8d9aa66
