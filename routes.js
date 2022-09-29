const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const jwt = require('jsonwebtoken')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
app.use(express.urlencoded({extended:false}))


router.get('', (req, res) => {
    res.sendFile(__dirname + '/frontend/login.html')
})

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/frontend/login.html')
})

router.post('/login',  urlencodedParser,(req, res) => {
    console.log("body pram",req.body)
    const query = {
        text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
        values: [req.body.username, req.body.password]
    }
    client.query(query, (err, result) => {
        if (err || result.rows[0] == null) {
            console.log("Wrong username or password")
            res.sendFile(__dirname + '/frontend/login.html')

        } else {
            let token
            try {
                token = jwt.sign(
                    { id: result.rows[0].firstname, username: result.rows[0].username },
                    "secretkeyappearshere",
                    { expiresIn: "1h" })
                res.sendFile(__dirname + '/frontend/user_dashboard.html')
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
    res.sendFile(__dirname + '/frontend/registration.html')
})

router.post('/registration', urlencodedParser, (req, res) => {

    const query = {
        text: 'INSERT INTO users(firstname, lastname, username, password, score, role) VALUES($1, $2, $3, $4, $5, $6)',
        values: [req.body.firstname, req.body.lastname, req.body.username, req.body.password, '0', 'user'],
    }

    client.query(query, (err, result) => {
        if (err) {
            console.log(err.stack)
            console.log("Error In Registration.")
        } else {
            console.log("Registration Suceesful.")
            res.sendFile(__dirname + '/frontend/login.html')
        }
    })

})

// router.get('/user_dashboard', (req, res) => {
//     res.sendFile(__dirname + '/frontend/user_dashboard.html')
// })

// router.get('/questions', (req, res) => {
//     res.sendFile(__dirname + '/frontend/questions.html')
// })

// router.get('/addquestions', (req, res) => {
//     res.sendFile(__dirname + '/frontend/add_questions.html')
// })

// router.get('/answer', (req, res) => {
//     res.sendFile(__dirname + '/frontend/answer.html')
// })

module.exports = router