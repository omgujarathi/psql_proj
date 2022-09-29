const express = require("express")
let router = express.Router();
const {getAllVerifiedQuestions, getAllQuestionByUserId} = require("./databaseModel.js")


const questions = async (req, res) => {
    res.send(await getAllVerifiedQuestions());
}

const myQuestions = async (req, res) => {
    const userId = req.query.userId;
    if (userId) {

        res.send(await getAllQuestionByUserId(userId))
        return
    }
    res.send({"error":"userId is missing"})
}



router.get("/verified-questions", questions)
router.get("/my-questions", myQuestions)

module.exports = {userDashboardRouter: router}