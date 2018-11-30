var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "userNumber":String,
    "userImg":String,
    "userSex":String,
    "userAge":String,
    "userQQ":String,
    "userPhone":String
});
module.exports = mongoose.model('users',userSchema);