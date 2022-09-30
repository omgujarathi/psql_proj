const express = require("express")
let router = express.Router();
const {
    getAllVerifiedQuestions, getAllQuestionByUserId, questionInfo, updateQuestionByUserId
} = require("./databaseModel.js")


const questions = async (req, res) => {
    const result = await getAllVerifiedQuestions();
    if (result.status) {
        res.send(result.questions)
        return
    }
    res.send({error: "Not able to fetch the verified questions"})
}

const myQuestions = async (req, res) => {
    const userId = req.query.userId;
    if (userId) {

        const result = await getAllQuestionByUserId(userId)
        if (result.status) {
            res.send(result.questions)
            return
        } else {
            res.send({"error": "error while running query to fetch all user question"})
            return
        }
    }
    res.send({"error": "userId is missing"})
}

const question = async (req, res) => {
    const {questionId} = req.params
    const result = await questionInfo(questionId)
    if (result.status) {
        res.send(result.data)
        return
    }
    res.send({"error": "error while running query to fetch question"})

}

const editQuestion = async (req, res) => {
    const {questionId} = req.params
    const result = await questionInfo(questionId)
    if (result.status) {
        if (result.data[0].is_verified === 0) {
            res.send(result.data[0])
            return
        } else {
            res.send({"error": "You Cant Edit This Question Because It Is Verified By The Admin "})
            return
        }
    }
    res.send({"error": "error while running query to fetch question for edit"})
}

const updateQuestion = async (req, res) => {
    const {userId, questionId, description, q_ans} = req.body;
    const result = await updateQuestionByUserId(userId, questionId, description, q_ans)
    if (result.status) {
        if (result.updatedRowsCount === 0) {
            res.send({error: "Question can not be edited invalid userId " + userId})
            return
        }
        res.send({status: "ok", updatedRowsCount: result.updatedRowsCount})
        return
    }
    res.send({"error": "error while running query to edit the question"})

}


router.get("/verified-questions", questions)
router.get("/my-questions", myQuestions)
router.get("/question/:questionId", question)
router.get("/edit-question/:questionId", editQuestion)
router.put("/edit-question", updateQuestion)

module.exports = {userDashboardRouter: router}