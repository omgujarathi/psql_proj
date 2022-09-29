const express = require("express")
const { userDashboardRouter } = require("./src/userDashboardRouter")
const { userAddQuestionRouter } = require("./src/userAddQuestionRouter")
const router = require('./routes')
const path = require("path");
const sessions = require('express-session')

const app = express()
const port = 8081;

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))



app.use(express.static(path.join(__dirname, "frontend")));


app.use("/api/user/dashboard", userDashboardRouter);
app.use("/api/user/add-question", userAddQuestionRouter);

app.use('', router)


app.listen(port, () => {
    console.log("Listening on port", port)
});