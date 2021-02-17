var mongoose = require("mongoose");

var Schema = mongoose.Schema;

let OrderItem = new Schema(
    {
        productId: {
            type: String,
        },
        productName: {
            type: String,
        },
        amount: {
            type: Number,
        },
        productInfo: {
            type: [String],
        },
    },{ _id : false }
);
/* let OrderPrice = new Schema({
    paymentMethod: {
        type: String,
    },                  //paymentId
    totalProducts: {
        type: Number,
    },
    shipping: {
        type: Number,
    },
    totalOrder: {
        type: Number,
    },
    currency: {
        type: String,
    },
});
let ShippingAddress = new Schema({
    postalCode: {
        type: Number,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    street: {
        type: String,
    },
    buildingNumber: {
        type: Number,
    },
    flatNumber: {
        type: Number,
    },
    floorNumber: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
}); */
var Order = new Schema(
    {
        /* _id:String, */
        orderItems: [OrderItem],
        orderPrice: {
            paymentMethod: {
                type: String,
            },                  //paymentId
            totalProducts: {
                type: Number,
            },
            shipping: {
                type: Number,
            },
            totalOrder: {
                type: Number,
            },
            currency: {
                type: String,
            },
        },
        orderDate: {
            type: String,
        },
        shippingAddress: {
            postalCode: {
                type: Number,
            },
            country: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            street: {
                type: String,
            },
            buildingNumber: {
                type: Number,
            },
            flatNumber: {
                type: Number,
            },
            floorNumber: {
                type: Number,
            },
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
        orderStatus: {
            type: String,
        },
        customerId: {
            type: String,
        },                  //CustomerId 
    },
    { collection: "Orders" }
);

var Orders = mongoose.model("Orders", Order);

module.exports = Orders;
