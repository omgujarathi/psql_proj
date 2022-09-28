const express = require('express')
const app = express()
const router = express.Router()

router.get('', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

router.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/registration.html')
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