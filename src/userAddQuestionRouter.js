const express = require("express");
const {insertQuestion} = require("./databaseModel.js")
const router = express.Router()
const {verifyToken} = require("../middleware/auth.js")


const userAddQuestionRouter = async (req, res) => {

    const {userId, description, q_ans} = req.body

    const result = await insertQuestion(userId, description, q_ans)
    if (result.status) {
        res.send({status: "ok", userId: userId, description: description, q_ans: q_ans})
        return

    }

    console.log(result.error)
    res.send({status: "error", error: result.error})

}

router.post("/question", verifyToken, userAddQuestionRouter)

module.exports = {
    userAddQuestionRouter: router
}
