var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Categories = new Schema(
  {
    // _id: String,
    name: String,
    sub: [],
  },
  { collation: "Categories" }
);

var Categories = mongoose.model("Categories", Categories);
Categories.find({}, function (err, data) {
  console.log(">>>> " + data);
});

module.exports = Categories;
