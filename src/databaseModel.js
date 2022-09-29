const {databaseObject} = require("./databaseConnection.js")


async function getAllVerifiedQuestions() {

    return await databaseObject
        .query("select * from questions where is_verified = 1")
        .then(res => res.rows)
        .catch(e => console.error((e)))

}


async function getAllQuestionByUserId(userId) {
    return await databaseObject
        .query("select * from questions where userid =" + userId)
        .then(res => res.rows)
        .catch(e => console.error(e))
}


async function insertQuestion(userId, description, q_ans) {
    return await databaseObject
        .query(`insert into questions(userid, description, q_ans, is_verified)
                values (${userId}, '${description}', '${q_ans}', 0)`)
        .then(res => res.rowCount == 1 ? true : false)
        .catch(e => console.log(e))
}


async function addUser(firstname,lastname,username,password,role){
    return await databaseObject
        .query(`INSERT INTO users(firstname,lastname,username,password,score, role) VALUES ('${firstname}','${lastname}','${username}','${password}',0,'${role}');`)
        .then(res=>res.rowCount ==1 ? true:false)
        .catch(e =>console.log(e))
}

async function isUserExits(username){
    return await  databaseObject
        .query(`select * from users where username = '${username}';`)
        .then(res=> res.rowCount!==0?true:false)
        .catch(e=> console.log(e))
}


module.exports = {
    getAllVerifiedQuestions: getAllVerifiedQuestions,
    getAllQuestionByUserId: getAllQuestionByUserId,
    insertQuestion: insertQuestion,
    addUser:addUser,
    isUserExits:isUserExits,

}