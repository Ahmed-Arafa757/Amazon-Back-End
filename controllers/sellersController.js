var Sellers = require('../models/sellersModel');


module.exports = function (app) {
  

     /////////get all sellers/////////
  app.get("/api/sellers", function (req, res, next) {
    Sellers.find({})
      .then((sellers) => res.status(200).send(sellers))
      .catch(next);
  });
     
    /////////get seller by sellerName/////////
  app.get("/api/sellers/name/:sellerName", function (req, res, next) {
    Sellers.find({ sellerName: req.params.sellerName })
      .then((seller) => res.status(200).send(seller))
      .catch(next);
  });
    
    /////////get seller by ID/////////
    app.get("/api/sellers/id/:id", function (req, res, next) {
        Sellers.findById({ _id: req.params.id })
        .then((seller) => res.status(200).send(seller))
        .catch(next);
    });

    
    // find and update & add new (if-else)
    app.post('/api/seller', function (req,res) {
        if (req.body._id) {
            Sellers.findByIdAndUpdate(req.body._id, {

                sellerName: req.body.sellerName,
                sellerId: req.body.sellerId,
                category: req.body.category,
                address: req.body.address,
                logo: req.body.logo,
                shortDesc: req.body.shortDesc,
                websiteURL: req.body.websiteURL,
                email: req.body.email,
                password: req.body.password,

                
            }, function (err, seller) {
                    if (err) throw err; 
                    console.log(seller);
                    res.send('updated');
            })
        }

        else {
            var newSeller = Sellers({
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

    
 /////////delete seller by ID/////////
 app.delete("/api/sellers/:id", function (req, res) {
    Sellers.deleteOne({ _id: req.params.id })
      .then((seller) => res.status(204).send(seller))
      .then(console.log("Seller is deleted"));
  });

}



