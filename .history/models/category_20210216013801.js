var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  // _id: String,
  name: string,
  location: string,
  totalOrders: number,
  totalProducts: number,
  isFull: boolean,
});

var CategoryWarehouse = mongoose.model("CategoryWarehouse", categorySchema);

module.exports = CategoryWarehouse;
