const express = require("express");
const app = express();
const bodyParser = require('body-parser');

//Controllers
const sellersController = require("./controllers/sellersController");
const categorysController = require("./controllers/categoryController");
const ProductController = require("./controllers/ProductController");
const usersController = require("./controllers/usersController");


// Connect to the MongoDB cluster
const mongoose = require("mongoose");
const mongoAtlasUri =
  "mongodb+srv://AhmadEltobshy:A123456@amazonclone.qg5vp.mongodb.net/AmazonDB?retryWrites=true&w=majority";
try {
  
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/* app.use("/assets", express.static(__dirname + "/public")); */ //if we use views but this project is for API only
app.set("view engine", "ejs"); //if we use views but this project is for API only



sellersController(app);
categorysController(app);
usersController(app);
ProductController(app);

//error middleware
app.use((err, req, res, next)=>{
  console.log(err.message);
  res.status(422).send({err: err.message})
})

const port = process.env.PORT || 3000;
app.listen(port);
