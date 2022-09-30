const express = require("express")
const {userDashboardRouter} = require("./src/userDashboardRouter")
const {userAddQuestionRouter} = require("./src/userAddQuestionRouter")
const router = require('./routes')
const path = require("path");
const app = express()
const port = 8081;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname,"frontend")));




app.use(express.static(path.join(__dirname, "frontend")));


app.use("/api/user/dashboard", userDashboardRouter);
app.use("/api/user/add-question", userAddQuestionRouter);

app.use('', router)


app.listen(port, () => {
    console.log("Listening on port", port)
});