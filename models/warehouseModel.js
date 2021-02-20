var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var warehouseSchema = new Schema({
  // _id: String,
  name: String,
  location: String,
  totalOrders: Number,
  totalProducts: Number,
  isFull: Boolean,
});

var TestWarehouse = mongoose.model("TestWarehouse", warehouseSchema);

module.exports = TestWarehouse;
