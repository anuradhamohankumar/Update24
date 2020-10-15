const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/update_24X7');

const connection = mongoose.connection;

module.exports = connection;