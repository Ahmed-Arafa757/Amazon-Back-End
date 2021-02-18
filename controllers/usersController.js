var Users = require("../models/usersModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
  /////////add new User/////////
  app.post("/api/users", function (req, res, next) {
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
            latitude: req.body.address[0].geoMap.latitude,
            longitude: req.body.address[0].geoMap.longitude,
          },
        },
      ],
      dateOfRegister: req.body.dateOfRegister,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
    });

    if (newUser.password !== newUser.repeatedPassword) {
      throw new Error("Password don't Match");
    }

    newUser.validate(function (err) {
      if (err) console.log(err);
      else {
        Users.create(newUser)
          .then((users) => res.status(201).send(users))
          .then(console.log("user added"))
          .catch(next);
      }
    });
  });

  /////////login and token/////////
  app.post("/api/users/login", function (req, res, next) {
    Users.find({ email: req.body.email })
      .exec()
      .then(
        
        users => {
        if (users.length < 1) {
          return res.status(401).json({
            message: "Auth s"
          });
        }
        console.log(users)
      }
        )
      //   bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      //     if (err) {
      //       return res.status(401).json({
      //         message: "Auth failed"
      //       });
      //     }
      //     if (result) {
      //       const token = jwt.sign(
      //         {
      //           email: user[0].email,
      //           userId: user[0]._id
      //         },
      //         process.env.JWT_KEY,
      //         {
      //             expiresIn: "1h"
      //         }
      //       );
      //       return res.status(200).json({
      //         message: "Auth successful",
      //         token: token
      //       });
      //     }
      //     res.status(401).json({
      //       message: "Auth failed"
      //     });
      //   });
      // })
      .catch(next);
  });

  /////////get all users/////////
  app.get("/api/users", function (req, res, next) {
    Users.find({})
      .then((users) => res.status(200).send(users))
      .catch(next);
  });

  /////////get user by name/////////
  app.get("/api/users/name/:userName", function (req, res, next) {
    Users.find({ userName: req.params.userName })
      .then((users) => res.status(200).send(users))
      .catch(next);
  });

  /////////get user by ID/////////
  app.get("/api/users/id/:id", function (req, res, next) {
    Users.findById({ _id: req.params.id })
      .then((users) => res.status(200).send(users))
      .catch(next);
  });
  /////////get user by Email/////////
  app.get("/api/users/email/:email", function (req, res, next) {
    Users.find({ email: req.params.email })
      .then((users) => res.status(200).send(users))
      .catch(next);
  });

  /////////update user by ID/////////
  app.put("/api/users/:id", function (req, res, next) {
    const updatedUser = new Users({
      _id: req.params.id,
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
            latitude: req.body.address[0].geoMap.latitude,
            longitude: req.body.address[0].geoMap.longitude,
          },
        },
      ],
      dateOfRegister: req.body.dateOfRegister,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
    });

    updatedUser.validate(function (err) {
      if (err) console.log(err);
      else {
        Users.updateOne({ _id: req.params.id }, updatedUser)
          .then(() => Users.findById({ _id: req.params.id }))
          .then((updatedUser) => res.status(200).send(updatedUser))
          .then(console.log("user updated"))
          .catch(next);
      }
    });
  });
  /////////delete user by ID/////////
  app.delete("/api/users/:id", function (req, res) {
    Users.deleteOne({ _id: req.params.id })
      .then((users) => res.status(204).send(users))
      .then(console.log("user deleted"));
  });
};
