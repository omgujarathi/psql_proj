const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const jwt = require('jsonwebtoken')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'sql_playground',
    password: 'aaa',
    port: '5432'
})
client.connect().then(() => {
    console.log("DB Connected.")
}).catch((err) => {
    console.log(err)
})

router.get('', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

router.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body)
    const query = {
        text: 'SELECT * FROM users WHERE username = $1 AND user_password = $2',
        values: [req.body.username, req.body.password]
    }
    client.query(query, (err, result) => {
        if (err || result.rows[0] == null) {
            console.log("Wrong username or password")
            res.sendFile(__dirname + '/login.html')

        } else {
            let token
            try {
                token = jwt.sign(
                    { id: result.rows[0].firstname, username: result.rows[0].username },
                    "secretkeyappearshere",
                    { expiresIn: "1h" })
                res.sendFile(__dirname + '/user_dashboard.html')
                console.log(token)
            }
            catch(err){
                console.log(err)
            }
            console.log("Login successful.")
        }
    })
})

router.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/registration.html')
})

router.post('/registration', urlencodedParser, (req, res) => {

    const query = {
        text: 'INSERT INTO users(firstname, lastname, username, user_password, score, user_role) VALUES($1, $2, $3, $4, $5, $6)',
        values: [req.body.firstname, req.body.lastname, req.body.username, req.body.password, '0', 'player'],
    }

    client.query(query, (err, result) => {
        if (err) {
            console.log(err.stack)
            console.log("Error In Registration.")
        } else {
            console.log("Registration Suceesful.")
            res.sendFile(__dirname + '/login.html')
        }
    })

})

router.get('/user_dashboard', (req, res) => {
    res.sendFile(__dirname + '/user_dashboard.html')
})

router.get('/questions', (req, res) => {
    res.sendFile(__dirname + '/questions.html')
})

router.get('/addquestions', (req, res) => {
    res.sendFile(__dirname + '/add_questions.html')
})

router.get('/answer', (req, res) => {
    res.sendFile(__dirname + '/answer.html')
})

module.exports = router