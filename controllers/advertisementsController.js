 var TestAdvertisements = require('../models/advertisementsModel');

 module.exports = function (app) {
    
     // get all
     app.get('/api/advertisements', function (req, res) {

         TestAdvertisements.find({}, function (err, advertisements) {
             if (err) throw err;

             res.send(advertisements)
         });
     });

     //   find by name 
     app.get('/api/advertisements/:companyname', function (req, res) {

         TestAdvertisements.find({
             companyName: req.params.companyname
         },
         function (err, advertisements) {
             if (err) throw err;

             res.send(advertisements)
         });
     });

     // find by id
     app.get('/api/advertisement/:id', function (req, res) {
         TestAdvertisements.findById({
             _id: req.params.id
         },
         function (err, advertisement) {
             if (err) throw err;
             res.send(advertisement)
         })
     })

     // find and update & add new (if-else)
     app.post('/api/advertisement', function (req, res) {
         if (req.body._id) {
             TestAdvertisements.findByIdAndUpdate(req.body._id, {

                 companyName: req.body.companyName,
                 AdTitle: req.body.AdTitle,
                 AdDescription: req.body.AdDescription,
                 date: req.body.date,
                 websiteUrl: req.body.websiteUrl,
                 img: req.body.img,
               
             },
             function (err, advertisement) {
                 if (err) throw err;
                 res.send(advertisement);
             })
         } else {
             var newSeller = TestSellers({
                 sellerName: req.body.sellerName,
                 sellerId: req.body.sellerId,
                 category: req.body.category,
                 address: req.body.address,
                 logo: req.body.logo,
                 shortDesc: req.body.shortDesc,
                 websiteURL: req.body.websiteURL,
                 email: req.body.email,
                 password: req.body.password,
             });

             newSeller.save(function (err) {
                 if (err) throw err;
                 res.send('Added');
             })
         }
     })

     // find by id and delete
     app.delete('/api/advertisement', function (req, res) {

         TestAdvertisements.findByIdAndRemove(req.body._id, function (err) {
             if (err) throw err;
             res.send('deleted');
         })
     })




 }