var express = require("express");
var app = express();

var mongoose = require("mongoose");

var sellersController = require("./controllers/sellersController");
var categorysController = require("./controllers/categoryController");
var advertisementsContorller = require("./controllers/advertisementsController");

var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );

  next();
});


const mongoAtlasUri =
  "mongodb+srv://AhmadEltobshy:A123456@amazonclone.qg5vp.mongodb.net/AmazonDB?retryWrites=true&w=majority";
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}


sellersController(app);
categorysController(app);
advertisementsContorller(app);

app.listen(port);
