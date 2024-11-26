const express = require("express");
const port = 1002;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let todos = [
    { id: 1, task: "Buy groceries" },
    { id: 2, task: "Finish homework" },
    { id: 3, task: "Clean the house" }
];

app.get("/", (req, res) => {
    res.render("index", { todos });
});

app.post("/addTask", (req, res) => {
    req.body.id = todos.length + 1;
    todos.push(req.body);
    res.redirect("/");
});

app.get("/deleteTask", (req, res) => {
    let deleteRecord = todos.filter((item) => item.id != req.query.id);
    todos = deleteRecord;
    res.redirect("/");
});

app.get("/editTask/:id", (req, res) => {
    let singleTask = todos.find((item) => item.id == req.params.id);
    res.render("edit", { singleTask });
});

app.post("/updateTask", (req, res) => {
    todos.forEach((task) => {
        if (task.id == req.body.id) {
            task.id = req.body.id;
            task.task = req.body.task;
        }
    });
    res.redirect("/");
});

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server started on port " + port);
});
