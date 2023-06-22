const mongoose = require( 'mongoose')

const Stats = mongoose.model( 'Stat', {
  pays: {
    type: String,
    required : true
  },
  ville: {
    type: String,
    required : true
  },
  quartier: {
    type: String,
    required : true
  },
  type_crime: {
    type: String,
    required : true
  },
  nbre_victime: {
    type: Number,
    required : true
  },
  gravité: {
    type: String,
    required : true
  },
  image: {
    type: String,
  },
  message: {
    type: String,
  },
  description: {
    type: String,
  },
  time : {
    type : Date,
    default: Date.now,
  },
  month: {
    type: Number,
    default: function() {
      return this.time.getMonth()+1;
    }
  },
  year: {
    type: Number,
    default: function() {
      return this.time.getFullYear();
    }
  },
  day: {
    type: Number,
    default: function() {
      return this.time.getDate();
    }
  },
},
"Stat");

module.exports = { Stats }