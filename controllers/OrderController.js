const Orders = require("../models/orderModel");

module.exports = function (app) {
  // get all
  app.get("/api/orders", function (req, res, next) {
    Orders.find({})
      .then((orders) => res.status(200).send(orders))
      .catch(next);
  });

  // find by id
  app.get("/api/order/id/:id", function (req, res, next) {
    Orders.findById({ _id: req.params.id })
      .then((order) => res.status(200).send(order))
      .catch(next);
  });

  //  add new
  app.post("/api/order/add", (req, res, next) => {
    const order = new Orders({
      reviewerID: req.body.reviewerID,
      reviewerName: req.body.reviewerName,
      reviewTime: req.body.reviewTime,
      reviewSummary: req.body.reviewSummary,
      fullReview: req.body.fullReview,
      reviewVote: req.body.reviewVote,
      productID: req.body.productID,

      _id: req.body._id,
      orderItems: req.body.orderItems,
      orderPrice: req.body.orderPrice,
      orderDate: req.body.orderDate,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus,
      customerId: req.body.customerId,
    });
    order
      .save()
      .then((createdOrder) => {
        res.status(201).json({
          message: "Order added successfully",
          orderID: createdOrder._id,
        });
      })
      .catch(next);
  });

  // edit
  app.put("/api/order/:id", function (req, res, next) {
    const orderId = req.params.id;
    const order = req.body;

    Orders.findByIdAndUpdate({ _id: orderId }, order)
      .then(() => Orders.findById({ _id: orderId }))
      .then((order) => res.status(200).send(order))
      .catch(next);
  });

  // find by id and delete
  app.delete("/api/order/:id", function (req, res,next) {
    Orders.deleteOne({ _id: req.params.id }).then((order) =>
      res.status(204).send(order)
    );
  });
};