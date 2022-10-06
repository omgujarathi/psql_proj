const express = require("express")
let router = express.Router();
const {
    getAllVerifiedQuestions, getAllQuestionByUserId, questionInfo, updateQuestionByUserId,SubmitAnswerByUserId,answerbyUserId,
} = require("./databaseModel.js")
const {verifyToken} = require("../middleware/auth.js")


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
    console.log(userId);
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
    //console.log(questionId);
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
const submitAnswer = async (req, res) => {
    const {userId, questionId, description} = req.body;
    const result = await SubmitAnswerByUserId(userId, questionId, description)
    if (result.status) {
        if (result.updatedRowsCount === 0) {
            res.send({error: "answer can not be edited invalid userId " + userId})
            return
        }
        res.send({status: "ok", updatedRowsCount: result.updatedRowsCount})
        return
    }
    res.send({"error": "error while running query to edit the question"})

}
const answer = async (req, res) => {
    
    const a=req.params.qid.toString().split('+');
    const qId=a[0];
    const uId=a[1];
    // console.log(a[0]);
    // console.log("aaaaaaaaaaaaaaa")
    console.log(qId,uId);

    const result = await answerbyUserId(qId,uId)
    if (result.status) {
        res.send(result.data)
        return
    }
    res.send({"error": "error while running query to fetch answer"})

    
}

// router.get("/verified-questions", questions)
// router.get("/my-questions", myQuestions)
// router.get("/question/:questionId", question)
// router.get("/edit-question/:questionId", editQuestion)
// router.put("/edit-question", updateQuestion)
// router.post("/submit-answer", submitAnswer)
// router.get("/answer/:qid", answer);

// router.get("/verified-questions", questions)
// router.get("/my-questions", myQuestions)
// router.get("/question/:questionId", question)
// router.get("/edit-question/:questionId", editQuestion)
// router.put("/edit-question", updateQuestion)
// router.post("/submitanswer", submitAnswer)
// router.get("/answer/:qid", answer);
router.get("/questions/verified", questions)
router.get("/questions/my_questions", myQuestions)
router.get("/questions/:questionId", question)
router.get("/questions/:questionId?is_verified=1", editQuestion)
router.put("/questions/edit-question", updateQuestion)
router.post("/answers", submitAnswer)
router.get("/answers/:qid", answer);

module.exports = {userDashboardRouter: router}