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
            if(doc==null){
                res.json({
                    status:"102",
                    msg:"没有该商品",
                    result:""
                })
            }else{
                res.json({
                    status:"0",
                    msg:"查询成功",
                    result:doc
                })
            }

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
        "goodsStatus":"1",
        "goodsCheck":"1",
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
                result:doc1._id
            })
        }
    })
});
//商品删除
router.post("/deletegoods",function (req,res,next) {
    let goodsId = req.body.goodsId;
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
            doc.goodsType=(!req.body.goodsType)?doc.goodsType:req.body.goodsType,
            doc.goodsName=(!req.body.goodsName)?doc.goodsName:req.body.goodsName,
            doc.goodsDetail=(!req.body.goodsDetail)?doc.goodsDetail:req.body.goodsDetail,
            doc.goodsPrice=(!req.body.goodsPrice)?doc.goodsPrice:req.body.goodsPrice,
            doc.goodsNum=(!req.body.goodsNum)?doc.goodsNum:req.body.goodsNum,
            doc.goodsImg=(!req.body.goodsImg)?doc.goodsImg:req.body.goodsImg,
            doc.goodsAuthor=(!req.body.goodsAuthor)?doc.goodsAuthor:req.body.goodsAuthor,
            doc.goodsAuthorId=(!req.body.goodsAuthorId)?doc.goodsAuthorId:req.body.goodsAuthorId,
            doc.goodsStatus=(!req.body.goodsStatus)?doc.goodsStatus:req.body.goodsStatus,
            doc.goodsCheck=(!req.body.goodsCheck)?doc.goodsCheck:req.body.goodsCheck,
            doc.goodsTime=(!req.body.goodsTime)?doc.goodsTime:req.body.goodsTime,
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
//上传商品图片
router.post('/addgoodsimg',function (req,res,next) {
    var form = new multiparty.Form();
    var msg = {status:0,msg:'',result:''};
    form.encoding = 'utf-8';
    //设像图片存放位子
    form.uploadDir = "../public/images/goods";
    //设置单文件大小限制
    form.maxFieldsSize = 2*1024*1024;
    //文件上传到指定文件
    form.parse(req,function (err,fields,files) {
        if(err){
            console.log('文件上传出错');
            msg.status = 202;
            msg.msg = "文件上传出错";
            res.send(msg);
            return;
        }
        //文件存储路径
        let src = path.join(files.files[0].path);
        let imgsrc = 'http://localhost:3000/images/goods/'+src.substr(src.lastIndexOf('goods')+6);
        res.send(imgsrc);
        console.log(imgsrc);
    })
})
//商品搜索功能
router.get('/search',function (req,res,next) {
    let goodsKey = req.param('goodsKey');
    Goods.find({goodsName:{$regex: goodsKey}},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:"请求出错"
            });
        }else{
            if(doc.length==0){
                res.json({
                    status:"102",
                    msg:"没有搜索到商品",
                    result:""
                })
            }else{
                res.json({
                    status:"0",
                    msg:"搜索商品成功",
                    result:doc
                })
            }
        }
    })
})
//商品分类接口
router.post('/type',function(req,res,next){
    let goodsType = req.body.goodsType;
    Goods.find({goodsType:goodsType},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:"请求出错"
            });
        }else{
            res.json({
                status:'0',
                msg:"获取成功",
                result:doc
            })
        }
    })
})
module.exports = router;