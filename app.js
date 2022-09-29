const express = require("express")
const {userDashboardRouter} = require("./src/userDashboardRouter")
const {userAddQuestionRouter} = require("./src/userAddQuestionRouter")
const router = require('./routes')

// const {registrationRouter}=require("./src/registrationRouter.js")
const app = express()
const port = 8081;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

console.log("were are you")


// app.use(express.static(path.join(__dirname + "/frontend")))

app.use("/api/user/dashboard", userDashboardRouter);
app.use("/api/user/add-question", userAddQuestionRouter);
// app.use("/api/register",registrationRouter);

app.use('', router)


app.listen(port, () => {
    console.log("Listening on port", port)
});