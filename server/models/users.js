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
    "userPhone":String,
    "userGoods":[{
        "goodsId":String,
        "goodsType":String,
        "goodsName":String,
        "goodsDetail":String,
        "goodsPrice":String,
        "goodsNum":String,
        "goodsImg":String,
        "goodsAuthor":String,
        "goodsAuthorId":String,
        "goodsStatus":String,
        "goodsCheck":String,
        "goodsTime":String
    }]
});
module.exports = mongoose.model('users',userSchema);