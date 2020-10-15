const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
  title: String,
  description: String,
  url: String,
  urltoimg: String,
  publishedAt: String
});
mongoose.model('newslist', UserSchema);

module.exports = mongoose.model('newslist');