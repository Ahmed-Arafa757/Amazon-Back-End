const Orders = require('../models/orderModel');

module.exports = function (app) {
   
    // get all
    app.get('/api/orders', function (req, res ,next) {

        Orders.find({})
        .then(orders => res.status(200).send(orders))
        .catch(next)
    });

    // find by id
    app.get('/api/order/id/:id', function (req, res,next) {
        Orders.findById({_id: req.params.id})
        .then(order => res.status(200).send(order))
        .catch(next)
    })

    //  add new 
    app.post('/api/order/add', function (req, res , next) {
        console.log(req.data);
        Orders.create(req.body)
            .then(order =>
                res.status(201).send(order))
            .catch(next)              
    })

    // edit
    app.put('/api/order/:id', function (req, res , next) {
        const orderId = req.params.id;
        const order = req.body;

        Orders.findByIdAndUpdate({_id: orderId}, order)
        .then(() => Orders.findById({_id: orderId}))
        .then(order => res.status(200).send(order))
        .catch(next);
    })

    // find by id and delete
    app.delete('/api/order/:id', function (req, res) {

        Orders.findByIdAndRemove({_id: req.params.id})
        .then(order => res.status(204).send(order))
    })

}
