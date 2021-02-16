var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var sellersSchema = new Schema({

    // _id: String,
    sellerName: String,
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
        }
    },
    logo: String,
    shortDesc: String,
    websiteURL: String,
    email: String,
    password: String,
    
});

var TestSellers = mongoose.model('TestSellers', sellersSchema);

module.exports = TestSellers;