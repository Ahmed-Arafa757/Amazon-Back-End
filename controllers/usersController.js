require('dotenv').config();
var Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = function (app) {

 

  /////////add new User  (reg)/////////
  app.post("/user/register", async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedRepeatedPassword = await bcrypt.hash(req.body.repeatedPassword, salt);
      // console.log(salt);
      // console.log(hashedPassword);


      var newUser = new Users({

        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        repeatedPassword: hashedRepeatedPassword,
      });


      Users.find({
        email: req.body.email
      }, function (err, USER) {

        if (USER[0] !== undefined) {
          if (USER[0].email = req.body.email) {
            res.status(500).send('email already exists');

          }
        } else {
          if (newUser.password !== newUser.repeatedPassword) {
            // throw new Error("Password don't Match");
            res.send("Password and repeated password don't Match");
          } else {
            newUser.save(function (err) {
              if (err) throw err;
              res.status(200).send('User Added');
            })
          }


        }

      })


    } catch {
      res.status(500).send("an error occured")
    }

  });

  /////////login/////////
  app.post('/user/login', (req, res) => {
    Users.find({
        email: req.body.email

      },
      async function (err, USER) {
        if (err) throw err;

        try {
          if (await (bcrypt.compare(req.body.password, USER[0].password)) === true) {
            console.log('Logged in Successfully');
            const accessToken =  jwt.sign(USER[0].email, process.env.ACCESS_TOKEN_SECRET);
            const userId = USER[0]._id;
            // res.json({ accessToken: accessToken });
           
            res.status(200).json({ 
              USER,
              accessToken, 
              userId
            });

          } else {

            console.log('inCorrect password'); 
            res.status(500).send('inCorrect password');  

          };


        } catch {
          res.status(500).send("you are not registered") 
          // console.log('error occurred');
        }

      });


  })

  /////////get all users/////////
  app.get("/users",function (req, res) {
    Users.find({}, function (err, USERS) {
      if (err) throw err;
      console.log('ay7aga');
      res.send(USERS);
    });
  });


  /////////get user by name/////////
  app.get("/users/name/:userName", function (req, res) {
    Users.find({
      userName: req.params.userName
    }, function (err, USERS) {
      if (err) throw err;

      res.send(USERS);
    })

  });

  /////////get user by ID/////////
  app.get("/user/id/:id", function (req, res) {
    Users.findById({
        _id: req.params.id
      },
      function (err, USER) {
        if (err) throw err;
       
        res.send(USER);
      })

  });
  /////////get user by Email/////////
  app.get("/user/email/:email", function (req, res) {
    Users.find({
        email: req.params.email
      },
      function (err, USER) {
        if (err) throw err;

        res.send(USER);
      })

  });

  /////////update user by ID/////////
  app.put("/user", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedRepeatedPassword = await bcrypt.hash(req.body.repeatedPassword, salt);


      if (req.body._id) {
        Users.findByIdAndUpdate(
          req.body._id, {
            // _id: req.body.id,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            repeatedPassword: hashedRepeatedPassword,
          },
          function (err, USER) {
            if (err) throw err;
            res.send(USER);
          }
        );
      }
    } catch {

    }
  });

  /////////delete user by ID/////////
  app.delete("/user/:id", function (req, res) {
    Users.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      console.log('deleteddd');
      res.send("deleted");
    });

  });  
};





function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  };

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user;
    next();
  })
}