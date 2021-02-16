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

module.exports = Categories;
