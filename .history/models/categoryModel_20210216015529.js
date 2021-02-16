var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  // _id: String,
  name: String,
  sub: String[""],
});

var CategoryWarehouse = mongoose.model("CategoryWarehouse", categorySchema);

module.exports = CategoryWarehouse;
