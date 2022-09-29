var express = require('express')
var router = require('./routes')
const sessions = require('express-session')
const cookieParer = require('cookie-parser')

app = express()

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParer())
app.use('', router)

app.listen(3000, () => {
    console.log("server started")
})
