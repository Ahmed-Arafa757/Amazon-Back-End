var mongoose = require('mongoose'),

    var Schema = mongoose.Schema,


        var advertisementsSchema = new Schema({

               _id: string,
               companyName: string,
               AdTitle: string,
               AdDescription: string,
               date: {
                   publishedDate: string,
                   expirationDate: string,
               },
               websiteUrl: string,
               img: string,

        })

var Advertisments = mongoose.model('Advertisments', advertisementsSchema);

module.exports = Advertisments