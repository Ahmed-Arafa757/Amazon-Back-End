var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Sellers = new Schema({
  // _id: String,
  sellerName: {
    type: String,
    required: true,
    max: 40,
    min: 6,
  },
  sellerId: String,
  category: String,
  address: {
    postalCode: Number,
    street: String,
    state: String,
    city: String,
    country: String,
    geoMap: {
      latitude: Number,
      longitude: Number,
    },
  },
  logo: String,
  shortDesc: String,
  websiteURL: String,
  email: {
    type: String,
    required: true,
    max: 40,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 10,
  },
  repeatedPassword: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 10,
  },
},{collection:"Sellers"});

Sellers.pre('save', async function (next) {
  try{
const salt = await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(this.password,salt)
const hashedRepeatedPassword=await bcrypt.hash(this.repeatedPassword,salt)
this.password=hashedPassword
this.repeatedPassword=hashedRepeatedPassword
next()
  }catch(err){
    next(err)
  }
});

Sellers.methods.comparePassword = function (myPlaintextPassword) {
  const userInstance = this;
  return bcrypt.compare(myPlaintextPassword, userInstance.password);
};

Sellers.pre('save', function (next) {
  var newSeller = this;
  Sellers.find({sellerName : newSeller.sellerName}, function (err, docs) {
      if (!docs.length){
          next();
      }else{                
          console.log('sellerName already exists!!: ',newSeller.sellerName);
          next(new Error("sellerName already exists!!"));
      }
  });
}) ;

Sellers.pre('save', function (next) {
  var newSeller = this;
  Sellers.find({email : newSeller.email}, function (err, docs) {
      if (!docs.length){
          next();
      }else{                
          console.log('this email is already registerd!!: ',newSeller.email);
          next(new Error("this email is already registerd!!"));
      }
  });
}) ;

var Sellers = mongoose.model("Sellers", Sellers);

module.exports = Sellers;
