const mongoose = require("mongoose");
// const password = encodeURIComponent("abcABC!@#123");
// console.log(password);
// const connectionString = `mongodb+srv://agarzonsanchez90:${password}@nodeexpressprojects.tqugn.mongodb.net/`;

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;

// mongoose
//   .connect(connectionString)
//   .then(() => console.log("CONNECTED TO THE DB"))
//   .catch((e) => console.log(e));
