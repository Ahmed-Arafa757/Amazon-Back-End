var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  // _id: String,
  name: String,
  sub: [],
});

var Category = mongoose.model("Category", categorySchema);

module.exports = Category;
