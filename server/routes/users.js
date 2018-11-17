let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Lists = require('../models/users');

mongoose.connect('mongodb://127.0.0.1/tests');

mongoose.connection.on("connected",function () {
    console.log("MongoDB connected success!");
});

mongoose.connection.on("error",function () {
    console.log("MongoDB connected fail!");
});

mongoose.connection.on("disconnected",function () {
    console.log("MongoDB connected disconnected!");
});

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
        userPwd=req.body.userPwd,
        userName=req.body.userName,
        userScore=0;
    let lists = new Lists({
        "userId":userId,
        "userPwd":userPwd,
        "userName":userName,
        "userScore":userScore
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

module.exports = router;