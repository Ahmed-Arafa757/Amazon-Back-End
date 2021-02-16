var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var warehouseSchema = new Schema({
  // _id: String,
  name: string,
  location: string,
  totalOrders: number,
  totalProducts: number,
  isFull: boolean,
});

var TestWarehouse = mongoose.model("TestWarehouse", warehouseSchema);

module.exports = TestWarehouse;
