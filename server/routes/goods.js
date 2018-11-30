let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');
let  multiparty = require('multiparty');
let path = require('path');

mongoose.connect('mongodb://127.0.0.1/XYY');

mongoose.connection.on("connected",function () {
    console.log("MongoDB connected success!");
});

mongoose.connection.on("error",function () {
    console.log("MongoDB connected fail!");
});

mongoose.connection.on("disconnected",function () {
    console.log("MongoDB connected disconnected!");
});
//商品信息获取接口
router.get('/',function (req,res,next) {
    let goodsModel = Goods.find({});
    goodsModel.sort({"goodsDetail":1});
    goodsModel.exec(function (err, doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:""
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
})
//商品查询接口
router.get('/checkall',function (req,res,next) {
    let goodsId = req.param('goodsId');
    Goods.findOne({_id:goodsId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:"查询出错",
                result:""
            })
        }else{
            res.json({
                status:"0",
                msg:"查询成功",
                result:doc
            })
        }
    })
})
//添加商品信息
router.post('/addgoods',function (req,res,next) {
    let addgoods = new Goods({
        "goodsType":req.body.goodsType,
        "goodsName":req.body.goodsName,
        "goodsDetail":req.body.goodsDetail,
        "goodsPrice":req.body.goodsPrice,
        "goodsNum":req.body.goodsNum,
        "goodsImg":req.body.goodsNum,
        "goodsAuthor":req.body.goodsAuthor,
        "goodsAuthorId":req.body.goodsAuthorId,
        "goodsStatus":req.body.goodsStatus,
        "goodsCheck":req.body.goodsCheck,
        "goodsTime":req.body.goodsTime
    })
    addgoods.save(function (err,doc1) {
        if(err){
            res.json({
                status:"1",
                msg:res.message,
                result:""
            })
        }else{
            res.json({
                status:"0",
                msg:"添加商品成功",
                result:""
            })
        }
    })
});
//商品删除
router.get("/deletegoods",function (req,res,next) {
    let goodsId = req.param('goodsId');
    Goods.remove({'_id':goodsId},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            res.json({
                status:'0',
                msg:'删除成功',
                result:""
            })
        }
    })
})
//商品修改
router.post('/changegoods',function (req,res,next) {
    let goodsId = req.body.goodsId;
    Goods.findOne({"_id":goodsId},(err,doc)=>{
            doc.goodsType=req.body.goodsType,
            doc.goodsName=req.body.goodsName,
            doc.goodsDetail=req.body.goodsDetail,
            doc.goodsPrice=req.body.goodsPrice,
            doc.goodsNum=req.body.goodsNum,
            doc.goodsImg=req.body.goodsNum,
            doc.goodsAuthor=req.body.goodsAuthor,
            doc.goodsAuthorId=req.body.goodsAuthorId,
            doc.goodsStatus=req.body.goodsStatus,
            doc.goodsCheck=req.body.goodsCheck,
            doc.goodsTime=req.body.goodsTime
        doc.save(function (err,doc1) {
            if(err){
                res.json({
                    status:"1",
                    msg:res.message,
                    result:""
                })
            }else{
                res.json({
                    status:"0",
                    msg:"修改商品成功",
                    result:doc1
                })
            }
        })
    })

});
module.exports = router;