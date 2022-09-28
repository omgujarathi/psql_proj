const express = require("express")
let router = express.Router();
const {getAllVerifiedQuestions,getAllQuestionByUserId}= require("./databaseModel.js")



const getQuestions=async (req,res)=>{
    res.send(await getAllVerifiedQuestions());
}

const getMyQuestions=async (req,res)=>{
    const userId = req.query.userId;
    res.send(await getAllQuestionByUserId(userId))
}


router.get("/getQuestions",getQuestions)
router.get("/getMyQuestions",getMyQuestions)

module.exports = {dashboardRouter:router}