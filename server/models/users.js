var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "userScore":Number
});
module.exports = mongoose.model('list',userSchema);