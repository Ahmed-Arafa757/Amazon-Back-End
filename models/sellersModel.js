var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sellersSchema = new Schema({
  // _id: String,
  sellerName: {
    type: String,
    required: true,
    max: 40,
    min: 6,
  },
  sellerId: String,
  category: String,
  address: {
    postalCode: Number,
    street: String,
    state: String,
    city: String,
    country: String,
    geoMap: {
      latitude: Number,
      longitude: Number,
    },
  },
  logo: String,
  shortDesc: String,
  websiteURL: String,
  email: {
    type: String,
    required: true,
    max: 40,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 10,
  },
  repeatedPassword: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 10,
  },
},{collection:"Sellers"});

var Sellers = mongoose.model("Sellers", sellersSchema);

module.exports = Sellers;
