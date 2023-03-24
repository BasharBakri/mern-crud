const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,

  cash: {
    type: Number,
    min: [0, 'cash must be at least 0'],
    max: [50000, 'cash must can not be more than 50000'],
    default: 0
  },
  credit: {
    type: Number,
    min: [0, 'credit must be at least 0'],
    max: [50000, 'credit must can not be more than 50000'],
    default: 0
  },
  passportId: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
});


module.exports = mongoose.model('User', UserSchema);