// console.log("Task Manager App")
//app.get
//app.post
//app.get :id
//app.patch
//app.delete

const express = require("express");
const app = express();
const tasks = require("./routes/task");
const port = 3001;
//middleware
app.use(express.json())

// routes
app.get("/hello", (req, res) => {
  res.send("Task manager app");
});

app.use("/api/v1/tasks", tasks);
app.listen(port, console.log(`Server is listening on port ${port}`));
