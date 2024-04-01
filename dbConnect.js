const mongoose = require("mongoose");

const URL =
  "mongodb+srv://bhaskar:Sh%40nmukh123@cluster0.27sqekn.mongodb.net/instantmarket";

mongoose.connect(URL);

let Obj = mongoose.connection;

Obj.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

Obj.on("error", () => {
  console.log("Mongo DB Connection Failed");
});
