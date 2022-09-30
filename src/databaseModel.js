const {databaseObject} = require("./databaseConnection.js")
const {query} = require("express");


async function getAllVerifiedQuestions() {


    const query = {
        text: "select id,description from questions where is_verified = $1", values: [1]
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


async function questionInfo(questionId) {
    const query = {
        text: "select q.id,q.userid,q.description,q.q_ans,q.database_link,q.is_verified,u.username,u.firstname,u.lastname from questions q inner join users u on q.userid = u.id where q.id = $1",
        values: [questionId]
    }

    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, data: res.rows}
        })
        .catch(e => {
            return {status: false, error: e}
        })

}


async function addUser(firstname, lastname, username, password, role) {

    const query = {
        text: "INSERT INTO users(firstname, lastname, username, password, score, role)  VALUES ($1, $2, $3, $4, $5, $6)",
        values: [firstname, lastname, username, password, 0, role]
    }


    return await databaseObject
        .query(query)
        .then(async (res) => {
            return {status: true, userData: {firstname, lastname, username}}
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
            return {status: true, isExits: res.rowCount >= 1}
        })
        .catch(e => {
            return {status: false, error: e}
        })

}

async function getUserByUserId(userId) {
    const query = {
        text: "select * from users where id = $1", values: [userId]
    }

    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, userData: res.rows}
        })
        .catch(e => {
            return {status: false, error: e}
        })
}


async function updateQuestionByUserId(userId, questionId, description, q_ans) {
    const query = {
        text: "update questions set description = $1 , q_ans = $2 where userid = $3 and id= $4",
        values: [description, q_ans, userId, questionId]
    }

    return await databaseObject
        .query(query)
        .then(res => {

            return {status: true, updatedRowsCount: res.rowCount}
        })
        .catch(e => {
            return {status: false, error: e}
        })


}


async function getPasswordByUsername(username) {
    const query = {
        text: "select password from users where username=$1", values: [username]
    }

    try {
        return await databaseObject
            .query(query)
            .then(res => {
                return {status: true, userData: res.rows[0].password}
            })
    } catch (e) {
        return {status: false, error: e}
    }

}

async function addToken(userid, token) {
    const query = {
        text: "update users set token = $1 where id=$2;", values: [token, userid]
    }

    try {
        return await databaseObject
            .query(query)
            .then(res => {
                return {status: true, userData: res.rows}
            })
    } catch (e) {
        console.log(e)
        return {status: false, error: e}
    }
}

async function getUserIdByUsername(username) {
    const query = {
        text: "select id from users where username = $1", values: [username]
    }

    return await databaseObject
        .query(query)
        .then(res => {
            return {status: true, userId: res.rows[0].id}
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
    questionInfo: questionInfo,
    getUserByUserId: getUserByUserId,
    updateQuestionByUserId: updateQuestionByUserId,
    getPasswordByUsername: getPasswordByUsername,
    addToken: addToken,
    getUserIdByUsername: getUserIdByUsername,

}