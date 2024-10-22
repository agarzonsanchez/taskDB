// console.log("Task Manager App")
//app.get
//app.post
//app.get :id
//app.patch
//app.delete

const express = require("express");
const cors = require("cors");
const app = express();
const tasks = require("../database/routes/task");
const connectDB = require("./db/connect");
const port = 3001;

require("dotenv").config();
//middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Specify the front-end's origin
  })
);

app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task manager app");
});

app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
