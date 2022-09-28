const express = require('express')
const app = express()
const router = express.Router()

router.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login.html')
})

module.exports = router