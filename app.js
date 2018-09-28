const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Closet = require("./models/closet");
const Clothes = require("./models/clothes");

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome Page"
  })
})

const userRoutes = require("./routes/user");
const clothesRoutes = require("./routes/clothes");
const closetRoutes = require("./routes/closets");

   
mongoose.connect("mongodb://localhost/smart-closet");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/user", userRoutes);
app.use("/clothes", clothesRoutes);
app.use("/closets", closetRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


app.listen(3000, () => {
    console.log("server started.......");
});
