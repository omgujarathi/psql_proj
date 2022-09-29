const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const { Client } = require('pg')
const jwt = require('jsonwebtoken')
const { getAllVerifiedQuestions, getAllQuestionByUserId, insertQuestion, addUser, isUserExits, verifyUser } = require('./src/databaseModel')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


router.get('', (req, res) => {
    req.session.uid ? res.redirect("/user_dashboard") : res.redirect("/login")
    console.log(req.session.uid)
    console.log(req.session.username)
})

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/frontend/login.html')
})

router.post('/login', urlencodedParser, async (req, res) => {

    const { username, password } = req.body
    const verifyUserResult = await verifyUser(username, password)

    if (verifyUserResult.result != null) {
        token = jwt.sign({ id: verifyUserResult.result.id }, "secretkeyappearshere", { expiresIn: "1h" })

        var session = req.session;
        session.uid = verifyUserResult.result.id
        session.username = verifyUserResult.result.username
        res.redirect("/user_dashboard")
        return
    }
    res.redirect("/login")
    return

})

router.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/frontend/registration.html')
})

router.post('/registration', urlencodedParser, async (req, res) => {

    const { firstname, lastname, username, password } = req.body
    const checkUserExists = await isUserExits(username);
    if (checkUserExists.isExits) {
        console.log("User already exists")
        res.redirect("/registration")
        return
    }
    const addUserResult = await addUser(firstname, lastname, username, password, "player")
    if (addUserResult) {
        res.redirect("/user_dashboard")
        return
    }
    res.redirect("/registration")
    return
})

router.get('/user_dashboard', (req, res) => {
    if(! req.session.uid){
        res.redirect("/login")
        return
    }
    res.sendFile(__dirname + '/frontend/user_dashboard.html')
})


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/login")
    
})












// router.get('/questions', (req, res) => {
//     res.sendFile(__dirname + '/frontend/questions.html')
// })

router.get('/add-questions', (req, res) => {
    res.sendFile(__dirname + '/frontend/add_questions.html')
})

// router.get('/answer', (req, res) => {
//     res.sendFile(__dirname + '/frontend/answer.html')
// })

module.exports = router