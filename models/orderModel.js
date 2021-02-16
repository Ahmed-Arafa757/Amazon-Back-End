var mongoose = require("mongoose");

var Schema = mongoose.Schema;

let OrderItem = new Schema (
    {
    productId:{
        type:string,
    },
    productName:{
        type:string,
    },
    amount:{
        type:number,
    },
    productInfo:{
        type:[string],
    },
      }
);
let OrderPrice = new Schema ({
    paymentMethod:{
        type:string,
    },                  //paymentId
    totalProducts:{
        type:number,
    },
    shipping:{
        type:number,
    },
    totalOrder:{
        type:number,
    },
    currency:{
        type:string,
    },
});
let ShippingAddress = new Schema ({
    postalCode:{
        type:number,
    },
    country:{
        type:string,
    },
    city: {
        type:string,
    },
    state: {
        type:string,
    },
    street: {
        type:string,
    },
    buildingNumber: {
        type:number,
    },
    flatNumber: {
        type:number,
    },
    floorNumber: {
        type:number,
    },
    latitude: {
        type:number,
    },
    longitude: {
        type:number,
    },
});
var Order = new Schema(
  {
    /* _id:string, */
    orderItems:{
        type:[OrderItem],
    },
    orderPrice:{
        type:OrderPrice,
    },
    orderDate:{
        type:string,
    },
    shippingAddress:{
        type:ShippingAddress,
    },
    orderStatus:{
        type:string,
    },
    customerId:{
        type:string,
    },                  //CustomerId 
  }
),

var Orders = mongoose.model("Orders", Order);

module.exports = Orders;
