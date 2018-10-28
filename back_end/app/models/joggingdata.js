var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var joggingdata = new Schema({
  distance: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  commite: {
    type: String
  }
},{
    collection: 'joggingdata'
});

module.exports = mongoose.model('joggingdata', joggingdata);