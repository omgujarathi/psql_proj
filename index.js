const express = require("express")
const {databaseObject} = require("./models/database")
const app = express()
const port = 8080;


app.get("/",(req,res)=>{
        databaseObject.query("select * from users",(err,databaseRes)=>{
            res.send(databaseRes.rows);
        })
})



app.listen(port,()=>{
    console.log("Listening on port",port)});