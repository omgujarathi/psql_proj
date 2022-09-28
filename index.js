var express = require('express')
var router = require('./routes')

app = express()
app.use('',router)
app.listen(3000,()=>{
    console.log("server started")
})