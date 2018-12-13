var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goodsSchema = new Schema({
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
    "goodsTime":String,
    "goodsDimgs":{}
});

module.exports = mongoose.model('good',goodsSchema);