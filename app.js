const express = require("express")
const {userDashboardRouter} = require("./src/userDashboardRouter")
const {userAddQuestionRouter} = require("./src/userAddQuestionRouter")
const router = require('./routes')
const env = require("dotenv")
const path = require("path");
const {loginRouter} = require("./src/loginRouter");
const app = express()
const port = 8081;

env.config()

app.use(express.json())
app.use(express.static(path.join(__dirname, "frontend")));


app.use("/api/user/dashboard", userDashboardRouter);
app.use("/api/user/add-question", userAddQuestionRouter);
app.use("/api/user/",loginRouter);
app.use('', router)


app.listen(port, () => {
    console.log("Listening on port", process.env.PORT)
});
