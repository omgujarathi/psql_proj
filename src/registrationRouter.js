const express = require("express")
const router = express.Router()
const {addUser, isUserExits} = require("./databaseModel.js")

const registerUser = async (req, res) => {
    const {firstname, lastname, username, password, role} = req.body
    if (await isUserExits(username)) {
        res.send({"error": "username already exists try another username or login"})
        return
    }

    res.send(await addUser(firstname, lastname, username, password, role))
}

router.post("/user", registerUser)

module.exports = {registrationRouter: router}