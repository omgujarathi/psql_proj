const express = require("express")
const router = express.Router()
const {addUser, isUserExits, getPasswordByUsername, addToken, getUserIdByUsername} = require("./databaseModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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

        bcrypt.compare(password, resultLogin.userData, async function (err, result) {
            if (result) {

                const userId = await getUserIdByUsername(username);
                const token = createJWTToken(username, userId.userId);
                await addToken(userId.userId, token)


                return res.status(200).send({"loginStatus": true, username, token})

            } else {
                return res.status(404).send({"error": "username or password does not match"})
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
        const result = await addUser(firstname, lastname, username, hash, "user")
        res.status(201).json({...result})
    })

}


function createJWTToken(userid, username) {
    return jwt.sign({userid, username}, process.env.JWT_TOKEN, {expiresIn: '5h'})
}

router.post("/register", register)
router.post("/login",  login)


module.exports = {loginRouter: router}