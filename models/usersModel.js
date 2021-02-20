var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

var Users = new Schema(
  {
    // _id: String,
    userName: {
      type: String,
      // required: true,
      max: 40,
      min: 6,
      // unique: true, 
      
    },
    email: {
      type: String,
      required: true,
      max: 40,
      min: 10,
      // unique: true
    },
    // name: { first: String, last: String },
    // age: Number,
    // phone: String,
    // img: String,
    // dateOfRegister: String,
    // address: [
    //   {
    //     postalCode: Number,
    //     street: String,
    //     state: String,
    //     city: String,
    //     country: String,
    //     geoMap: {
    //       latitude: Number,
    //       longitude: Number,
    //     },
    //   },
    // ],
    password: {
      type: String,
      required: true,
      // maxlength: 20,
      minlength: 6,
    },
    repeatedPassword: {
      type: String,
      // required: true,
      // maxlength: 20,
      minlength: 6,
    },
  },
  { collection: "Users" }
);



var Users = mongoose.model("Users", Users);

module.exports = Users;






// Users.pre('save', async function (next) {
//   try{
// const salt = await bcrypt.genSalt(10)
// const hashedPassword=await bcrypt.hash(this.password,salt)
// const hashedRepeatedPassword=await bcrypt.hash(this.repeatedPassword,salt)
// this.password=hashedPassword
// this.repeatedPassword=hashedRepeatedPassword
// next()
//   }catch(err){
//     next(err)
//   }
// });

// Users.methods.comparePassword = function (myPlaintextPassword) {
//   const userInstance = this;
//   return bcrypt.compare(myPlaintextPassword, userInstance.password);
// };

// Users.pre('save', function (next) {
//   var newUser = this;
//   Users.find({userName : newUser.userName}, function (err, docs) {
//       if (!docs.length){
//           next();
//       }else{                
//           console.log('userName already exists!!: ',newUser.userName);
//           next(new Error("userName already exists!!"));
//       }
//   });
// }) ;

// Users.pre('save', function (next) {
//   var newUser = this;
//   Users.find({email : newUser.email}, function (err, docs) {
//       if (!docs.length){
//           next();
//       }else{                
//           console.log('this email is already registerd!!: ',newUser.email);
//           next(new Error("this email is already registerd!!"));
//       }
//   });
// }) ;