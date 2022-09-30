const express = require("express")
const router = express.Router()
const {addUser, isUserExits, getPasswordByUsername} = require("./databaseModel.js")
const bcrypt = require("bcrypt")


const login = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).send({"error": "username or password is empty"})
    }

    const result = await isUserExits(username)

    if (result.isExits === false) {
        res.send({"error": "username does not exists try another username or register"})
        return
    }


    const resultLogin = await getPasswordByUsername(username)

    if (resultLogin.status === false) {
        return res.status(400).send("Error Running Query In Database")
    } else {

        bcrypt.compare(password, resultLogin.userData, function (err, result) {
            if (result) {
                return res.status(200).send({"loginStatus":true})
            }
            else{
                return  res.status(404).send({"error":"username or password does not match"})
            }
        });

    }


}



const register = async (req, res) => {
    const {firstname, lastname, username, password} = req.body

    const result = await isUserExits(username)

    if (result.isExits === true) {
        res.status(400).send({"error": "username already exists try another username or login"})
        return
    }
    bcrypt.hash(password, 10, async function (err, hash) {
        res.status(201).send(await addUser(firstname, lastname, username, hash, "user"))
    })

}

router.post("/register", register)
router.post("/login", login)


module.exports = {loginRouter: router}