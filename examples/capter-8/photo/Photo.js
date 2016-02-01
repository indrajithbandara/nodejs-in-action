var mongoose = require('mongoose');
// 建立在localhost上的以photo_app为数据库
mongoose.connect('mongodb://localhost/photo_app');
var schema = new mongoose.Schema({
  name: String,
  path: String
});
module.exports = mongoose.model('Photo', schema);
