const {databaseObject} = require("./databaseConnection.js")
const {isEqual} = require("lodash")

async function getResult(query) {
    let result
    try {
        await databaseObject.query("begin")


        if (query.startsWith("select") || query.startsWith("SELECT")) {
            result = await databaseObject.query(query)
                .then(res => res.rows)
        } else {
            await databaseObject.query(query)
                .then(res => res)

            result = await databaseObject.query("select * from playground_table")
                .then(res => res.rows)
        }


        return await databaseObject.query("rollback")
            .then(res => result)

    } catch (e) {
        return e
    }
}

const checkSubmission = async (userQuery, authorQuery) => {

    const userResult = await getResult(userQuery)
    const authorResult = await getResult(authorQuery)
    if(userResult.name === 'error'){
        return {"error":'error in # '+userQuery+' # at position '+ userResult.position}
    }
    if(authorResult.name === 'error'){
        return {"error":'error in # '+authorQuery+' # at position '+ authorResult.position}
    }
    return {userQuery, userResult, authorQuery, authorResult, isResultEqual: isEqual(userResult, authorResult)}

}

module.exports = {checkSubmission}