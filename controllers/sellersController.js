var Sellers = require('../models/sellersModel');
module.exports = function (app) {

   /////////add new User/////////
   app.post("/api/sellers", function (req, res, next) {
    var newSeller = new Sellers({
      sellerName: req.body.sellerName,
      email: req.body.email,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
      name: {
        first: req.body.name.first,
        last: req.body.name.last,
      },
      phone: req.body.phone,
      category:req.body.category,
      logoImg: req.body.logoImg,
      dateOfRegister: req.body.dateOfRegister,
      shortDesc: req.body.shortDesc,

      address: {
        postalCode: req.body.address.postalCode,
        street: req.body.address.street,
        state: req.body.address.state,
        city: req.body.address.city,
        country: req.body.address.country,
        geoMap: {
          latitude: req.body.address.geoMap.latitude,
          longitude: req.body.address.geoMap.longitude,
        },
      },
      
    });

    if (newSeller.password !== newSeller.repeatedPassword) {
      throw new Error("Password don't Match");
    }

    newSeller.validate(function (err) {
      if (err) console.log(err);
      else {
        Sellers.create(newSeller)
          .then((seller) => res.status(201).send(seller))
          .then(console.log("seller added"))
          .catch(next);
      }
    });
  });


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

     /////////update user by ID/////////
  app.put("/api/sellers/:id", function (req, res, next) {
    const updatedSeller = new Sellers({
      _id: req.params.id,
      sellerName: req.body.sellerName,
      email: req.body.email,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
      name: {
        first: req.body.name.first,
        last: req.body.name.last,
      },
      phone: req.body.phone,
      category:req.body.category,
      logoImg: req.body.logoImg,
      dateOfRegister: req.body.dateOfRegister,
      shortDesc: req.body.shortDesc,

      address: {
        postalCode: req.body.address.postalCode,
        street: req.body.address.street,
        state: req.body.address.state,
        city: req.body.address.city,
        country: req.body.address.country,
        geoMap: {
          latitude: req.body.address.geoMap.latitude,
          longitude: req.body.address.geoMap.longitude,
        },
      }
    });
        if (updatedSeller.password !== updatedSeller.repeatedPassword) {
          throw new Error("Password don't Match");
        }
        if (updatedSeller.password === updatedSeller.repeatedPassword) {
          const bcrypt = require('bcrypt');
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(updatedSeller.password, salt);
          const hashedRepeatedPassword = bcrypt.hashSync(updatedSeller.repeatedPassword, salt);
          updatedSeller.password=hashedPassword;
          updatedSeller.repeatedPassword=hashedRepeatedPassword;
        }

    updatedSeller.validate(function (err) {
      if (err) console.log(err);
      else {
        Sellers.updateOne({ _id: req.params.id }, updatedSeller)
          .then(() => Sellers.findById({ _id: req.params.id }))
          .then((seller) => res.status(200).send(seller))
          .then(console.log("seller updated"))
          .catch(next);
      }
    });
  });
    
 /////////delete seller by ID/////////
 app.delete("/api/sellers/:id", function (req, res , next) {
    Sellers.deleteOne({ _id: req.params.id })
      .then((seller) => res.status(204).send(seller))
      .then(console.log("Seller is deleted"))
      .catch(next);
  });

  ////////// login with google /////////
  app.post('/api/seller/google',function(req , res , next){
    console.log(req.body.email);
    console.log(req.body.provider);
    Sellers.find({email: req.body.email , provider : req.body.provider})
    .then((seller)=>res.status(200).send(seller))
    .catch(()=>res.status(404).send('Email Not Found'))
  })
  ////////// login with facebook /////////
  app.post('/api/seller/facebook',function(req , res , next){
    console.log(req.body.email);
    console.log(req.body.provider);
    Sellers.find({email: req.body.email , provider : req.body.provider})
    .then((seller)=>res.status(200).send(seller))
    .catch(()=>res.status(404).send('Email Not Found'))
  })

}



