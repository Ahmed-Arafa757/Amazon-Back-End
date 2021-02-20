const PaymentMethods = require("../models/paymentMethodModel");

module.exports = function (app) {
  app.get("/api/payment-methods", (req, res, next) => {
    PaymentMethods.find({})
      .then((documents) => {
        console.log(documents);
        res.status(200).json({
          message: "Payment Method fetched successfully",
          paymentMethods: documents,
        });
      })
      .catch(next);
  });
};
