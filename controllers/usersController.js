var Users = require("../models/usersModal");
var bodyParser = require("body-parser");
const { json } = require("body-parser");


var jwt = require('jsonwebtoken');



module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/users", function (req, res) {
    var newUser = new Users({
        
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
            postalCode: req.body.address[0].postalCode,
            street: req.body.address[0].street,
            state: req.body.address[0].state,
            city: req.body.address[0].city,
            country: req.body.address[0].country,
            geoMap: {
              latitude:req.body.address[0].geoMap.latitude,
              longitude:req.body.address[0].geoMap.longitude,
            },
          },
        ],
        dateOfRegister: req.body.dateOfRegister,
      
      })
      
      
    //   newUser.validate(function (err) {
    //     if (err) console.log(err);
    //     else{
        Users.save(newUser, function (err, newUser) {
            res.status(200).json(newUser)
          }); 
            // res.status(200).json(newUser)
    //     } 
    //   });  
    
  });

  app.get("/api/users", function (req, res) {
    // res.json({
    //     message:"get all users "
    // })

    Users.find({}, function (err, users) {
        if (err) throw err;
        res.send(users);
      
    });
  });

  app.get("/api/users/name/:userName", function (req, res) {
    // res.json({
    //     message:"user by name is coming"
    // })
    Users.find(
      {
        userName: req.params.userName,
      },
      function (err, user) {
        if (err) throw err;

        res.send(user);
      }
    );
  });

  app.get("/api/users/id/:id", function (req, res) {
    // res.json({
    //     message:"user by id is coming"
    // })
    
    Users.findById(
        
      {
        _id: req.params.id,
      },
      function (err, user) {
        if (err) throw err;
        res.send(user);
      }
    );
  });

  app.patch("/api/users", function (req, res) {
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

  app.delete("/api/users/:id", function (req, res) {
    //   res.json({
    //       message:"user is deleted"
    //   })
    Users.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      res.send("user deleted");
    });
  });

// app.listen(3000,()=>console.log("server started at port 3000"));
};

