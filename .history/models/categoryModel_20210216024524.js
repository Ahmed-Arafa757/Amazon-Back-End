var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    // _id: String,
    name: String,
    sub: [],
  },
  { collation: "Categories" }
);

var Categories = mongoose.model("Categories", categorySchema);
Categories.find({}, function (err, data) {
  console.log(">>>> " + data);
});

module.exports = Categories;
