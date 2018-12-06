let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Lists = require('../models/users');
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
//获取cookie

function getCookie(name)
{
    var bikky = document.cookie;
    name += "=";
    var i = 0;
    while (i < bikky.length)
    {
        var offset = i + name.length;
        if (bikky.substring(i, offset) == name)
        {
            var endstr = bikky.indexOf(";", offset);
            if (endstr == -1) endstr = bikky.length;
            return unescape(bikky.substring(offset, endstr));
        }
        i = bikky.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
//用户登陆接口
router.post('/', function(req, res, next) {
    let userId='',userPwd='';
    userId = req.body.userId;
    userPwd = req.body.userPwd;
    Lists.findOne({userId:userId},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:""
            })
        } else{
            if(!doc){
                res.json({
                    status:'103',
                    msg:"用户名不存在",
                    result:""
                })
            }
            else if(userPwd == doc.userPwd){
                res.json({
                    status:'0',
                    msg:'登陆成功',
                    result:doc
                });
            }
            else{
                res.json({
                    status:'102',
                    msg:'用户名或密码错误',
                    result:''
                })
            }
        }
    })
});
//用户注册接口
router.post('/register',function (req,res,next){
    let userId=req.body.userId,
        userNumber=req.body.userNumber,
        userPwd=req.body.userPwd,
        userName=req.body.userName,
        userScore=0;
    let lists = new Lists({
        "userId":userId,
        "userPwd":userPwd,
        "userName":userName,
        "userNumber":userNumber
    });
    Lists.findOne({userId:userId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:''
            })
        }else{
            if(doc){
                res.json({
                    status:"104",
                    msg:"该ID已被注册",
                    result:''
                })
            }else{
                lists.save(function (err1,doc) {
                    if(err1){
                        res.json({
                            status:"2",
                            msg:err1.message,
                            result:''
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'',
                            result:'suc'
                        })
                    }
                })
            }
        }
    })

});
//保存头像图片
router.post('/adduserimg',function (req,res,next) {
    var form = new multiparty.Form();
    var msg = {status:0,msg:'',result:''};
    // var userId = "123";
    form.encoding = 'utf-8';
    //设置头像图片存放位子
    form.uploadDir = "../public/images/users";
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
        let imgsrc = path.join('../public/images/users/'+src.substr(src.lastIndexOf('\\')+1));
        res.send(imgsrc);
        console.log(imgsrc);
        // Lists.findOne({userId:userId},(err3,doc)=>{
        //     if(err3){
        //         msg.status=1;
        //         res.send(msg)
        //     }else{
        //         doc.userImg = imgsrc;
        //         doc.save(function (err4,doc) {
        //             res.send(imgsrc);
        //         })
        //     }
        // })
    })
})
//修改头像图片接口
router.post('/changeuserimg',function (req,res,next) {
    let userImg = req.body.userImg;
    let userId = req.body.userId;
    Lists.findOne({userId:userId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:"图片保存出错",
                result:""
            })
        }else{
            doc.userImg = userImg;
            doc.save(function (err1,doc1) {
                res.json({
                    status:"0",
                    msg:"图片保存成功",
                    result:""
                })
            })
        }
    })
})
//用户查询接口
router.get('/check',function (req,res,next) {
    let userId = req.param("userId");
    Lists.findOne({userId:userId},(err,doc)=>{
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
});
//修改用户信息接口
router.post('/change',function (req,res,next) {
    let userId = req.body.userId;
    Lists.findOne({userId:userId},(err,doc)=>{
        if(err){
            res.json({
                status:"202",
                msg:"数据查询出错",
                result:""
            })
        }else{
            doc.userName = req.body.userName;
            doc.userNumber = req.body.userNumber;
            doc.userPwd = req.body.userPwd;
            doc.userImg = req.body.userImg;
            doc.userPhone = req.body.userPhone;
            doc.userSex = req.body.userSex;
            doc.userAge = req.body.userAge;
            doc.userQQ = req.body.userQQ;
            if(doc=='null'){
                res.json({
                    status:"102",
                    msg:"该用户不存",
                    result:""
                })
            }else{
                doc.save(function (err1,doc1) {
                    if(err1){
                        res.json({
                            status:"1",
                            msg:"保存操作错误",
                            result:""
                        })
                    }else {
                        res.json({
                            status:"",
                            msg:"保存操作成功",
                            result:doc1
                        })
                    }
                });
            }
        }
    });
})
module.exports = router;