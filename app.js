const express = require("express");
const app = express();
const bodyParser = require("body-parser");



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
app.use(bodyParser.urlencoded({ extended: true })); //if we use views but this project is for API only
/* app.use("/assets", express.static(__dirname + "/public")); */ app.set(
  "view engine",
  "ejs"
); //if we use views but this project is for API only
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
//Controllers
const sellersController = require("./controllers/sellersController");
const categorysController = require("./controllers/categoryController");
const ProductController = require("./controllers/ProductController");
const OrderController = require("./controllers/OrderController");
const reviewController = require("./controllers/reviewController");
const usersController = require("./controllers/usersController");

sellersController(app);
categorysController(app);
usersController(app);
ProductController(app);
OrderController(app);
reviewController(app);

//error middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(422).send({ err: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log("server started at port 3000"));
