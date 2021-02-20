const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    _id: { type: String, required: true },
    orderItems: { type: Array, required: true },
    orderPrice: { type: String, required: true },
    orderDate: { type: String, required: true },
    shippingAddress: { type: Object, required: true },
    orderStatus: { type: String, required: true },
    customerId: { type: String, required: true },
  },
  { collection: "Orders" }
);

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
