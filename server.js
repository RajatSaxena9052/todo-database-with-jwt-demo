const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const checkToken = require("./authentication");

const user = require("./routes/user")
const task = require("./routes/task");
const subtask = require("./routes/subtask");

const port = 5000;

app.use(express.json());

app.use("/user", user)

app.use("/task", task);

app.use("/subTask", subtask);


app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
})