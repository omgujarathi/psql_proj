const express = require("express")
let router = express.Router();
const {getAllVerifiedQuestions, getAllQuestionByUserId} = require("./databaseModel.js")


const questions = async (req, res) => {
    const result= await getAllVerifiedQuestions();
    if(result.status){
        res.send(result.questions)
        return
    }
    res.send({error:"Not able to fetch the verified questions"})
}

const myQuestions = async (req, res) => {
    const userId = req.query.userId;
    if (userId) {

        const result = await getAllQuestionByUserId(userId)
        if (result.status) {
            res.send(result.questions)
            return
        } else {
            res.send({"error": "error while running query"})
            return
        }
    }
    res.send({"error": "userId is missing"})
}


router.get("/verified-questions", questions)
router.get("/my-questions", myQuestions)

module.exports = {userDashboardRouter: router}