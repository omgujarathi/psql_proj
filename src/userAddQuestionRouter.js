const express = require("express")
let router = express.Router();
const {insertQuestion} = require("./databaseModel.js")

const {verifyToken} = require("../middleware/auth.js")


const userAddQuestionRouter = async (req, res) => {

    const {userId, description, q_ans} = req.body
    const result = await insertQuestion(userId, description, q_ans)
    if (result.status) {
        if (result.updatedRowsCount === 0) {
            res.send({error: "answer can not be edited invalid userId " + userId})
            return
        }
        res.send({status: "ok", userId: userId, description: description, q_ans: q_ans})
        return

    }

    console.log(result.error)
    res.send({status: "error", error: result.error})

}

router.post("/question",  userAddQuestionRouter)

module.exports = {
    userAddQuestionRouter: router
}
