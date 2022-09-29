const express = require("express");
const {insertQuestion} = require("./databaseModel.js")
const router = express.Router()


const addQuestion = async (req, res) => {

    const {userId, description, q_ans} = req.body

    res.send(await insertQuestion(userId, description, q_ans))

}

router.post("/addQuestion", addQuestion)

module.exports = {
    addQuestionRouter: router
}
