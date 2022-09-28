const express = require("express")
const {dashboardRouter} = require("./models/dashboard")
const{addQuestionRouter}=require("./models/addQuestion")
const path = require("path");
const app = express()
const port = 8081;

app.use(express.json())
app.use(express.urlencoded({
        extended: true
    }
))


app.use(express.static(path.join(__dirname+"/views")))

app.use("/dashboard", dashboardRouter);
app.use("/addQuestion",addQuestionRouter);


app.listen(port, () => {
    console.log("Listening on port", port)
});