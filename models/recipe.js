const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipe = new Schema ({
     name: {
         type: String,
         
         
     },
     author: {
         type: String,
         
     },
     type: {
         type: String,
         enum: ["dinner", "dessert", 'appetizer']

     },
     description: {
         type: String,
         
     },
     ingredients: [{
         type: String,
         default: "unknown",
     }],
     imgUrl:{
        type: String
     }, 
     user:{
         type: Schema.Types.ObjectId,
         ref: "User",
        //  require: true       
     }
})
module.exports = mongoose.model('Recipe', recipe)