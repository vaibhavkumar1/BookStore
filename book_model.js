let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let BookSchema = new Schema(
  {
    title: 
    { 
      type: String, 
      required: true 
    },
    author: 
    { 
      type: String, 
      required: true 
    },
    year: 
    { 
      type: Number, 
      required: true,
      validate(value){
        if(value<1700 || value>2021){
          throw new Error("Invalid year");
        }
      }
    },
    pages: 
    { 
      type: Number, 
      required: true, 
      validate(value){
        if(value<=10){
          throw new Error("Page can be 0 or less then 0");
        }
      } 
    },
    createdAt: 
    { 
      type: Date, 
      default: Date.now 
    }
  }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('book', BookSchema);