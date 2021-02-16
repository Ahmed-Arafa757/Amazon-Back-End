var Users = require("../models/usersModal");
// var bodyParser = require("body-parser");
// const { json } = require("body-parser");
var express = require('express');
var usersApp = express();
var jwt = require('jsonwebtoken');
// module.exports = function (usersApp) {
//   usersApp.use(bodyParser.json());
//   usersApp.use(bodyParser.urlencoded({ extended: true }));

  usersApp.post("/api/users", function (req, res) {
    var newUser = new Users({
        _id: "5ff8c51fa4c6cf417005fd5e",
        age: 26,
        name: {
          first: "mohamed",
          last: "elserety",
        },
        userName: "seretytest",
        email: "serety@test.com",
        phone: "(890) 559-3337",
        img: "http://placehold.it/32x32",
        address: [
          {
            postalCode: 21311,
            street: "Mohamed Basha mohsen",
            state: "Janakles",
            city: "Alexandria",
            country: "Egypt",
            geoMap: {
              latitude: 42.89877,
              longitude: 177.65516,
            },
          },
        ],
        dateOfRegister: "Friday, September 27, 2019 2:00 PM",
      })
      
    
      newUser.validate(function (err) {
        if (err) handleError(err);
        else{res.status(200).json(newUser)
        } 
      });  
    
  });

  usersApp.get("/api/users", function (req, res) {
    // res.json({
    //     message:"get all users "
    // })
    Users.find({}, function (err, users) {
      if (err) console.log(err);
      else res.status(200).send(users)
      
    });
  });

  usersApp.get("/api/users/:username", function (req, res) {
    res.json({
        message:"user by name is coming"
    })
    // Users.find(
    //   {
    //     userName: req.params.userName,
    //   },
    //   function (err, user) {
    //     if (err) throw err;

    //     res.send(user);
    //   }
    // );
  });

  usersApp.get("/api/users/:id", function (req, res) {
    res.json({
        message:"user by id is coming"
    })
    // Users.findById(
    //   {
    //     _id: req.params.id,
    //   },
    //   function (err, user) {
    //     if (err) throw err;
    //     res.send(user);
    //   }
    // );
  });

  usersApp.patch("/api/users", function (req, res) {
    res.json({
        message:"user is Updated"
    })

    if (req.body._id) {
      Users.findByIdAndUpdate(
        req.body.id,
        {
          _id: req.body._id,
          age: req.body.age,
          name: {
            first: req.body.name.first,
            last: req.body.name.last,
          },
          userName: req.body.userName,
          email: req.body.email,
          phone: req.body.phone,
          img: req.body.img,
          address: [
            {
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
          ],
          dateOfRegister: req.body.dateOfRegister,
        },
        function (err, user) {
          if (err) throw err;
          res.send(user);
        }
      );
    } 
  });

  usersApp.delete("/api/users", function (req, res) {
      res.json({
          message:"user is deleted"
      })
    // Users.findByIdAndRemove(req.body._id, function (err) {
    //   if (err) throw err;
    //   res.send("user deleted");
    // });
  });

usersApp.listen(3000,()=>console.log("server started at port 3000"));
// };

