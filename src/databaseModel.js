const {databaseObject} = require("./databaseConnection.js")


async function getAllVerifiedQuestions() {


    const query = {
        text: "select * from questions where is_verified = $1", values: [1]
    }


    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, questions: res.rows}
        })
        .catch(e => {
            return {status: false, error: e}
        })

}


async function getAllQuestionByUserId(userId) {
    const query = {
        text: "select * from questions where userid =$1", values: [userId]
    }
    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, questions: res.rows}
        })
        .catch(e => {
            return {status: false, error: e}
        })

}


async function insertQuestion(userId, description, q_ans) {

    const query = {
        text: "insert into questions(userid, description, q_ans, is_verified) values ($1, $2, $3, $4)",
        values: [userId, description, q_ans, 0]
    }

    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, rowsCount: res.count}
        })
        .catch((e) => {
            return {status: false, error: e}
        })

}


async function addUser(firstname, lastname, username, password, role) {

    const query = {
        text: "INSERT INTO users(firstname, lastname, username, password, score, role)  VALUES ($1, $2, $3, $4, $5, $6)",
        values: [firstname, lastname, username, password, role]
    }


    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, rowsCount: res.count}
        })
        .catch(e => {
            return {status: false, error: e}
        })
}


async function isUserExits(username) {

    const query = {
        text: "select * from users  where username = $1", values: [username]
    }


    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, isExits: res.rowCount !== 0}
        })
        .catch(e => {
            return {status: false, error: e}
        })

}


module.exports = {
    getAllVerifiedQuestions: getAllVerifiedQuestions,
    getAllQuestionByUserId: getAllQuestionByUserId,
    insertQuestion: insertQuestion,
    addUser: addUser,
    isUserExits: isUserExits,

}