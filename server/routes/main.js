/**
 * Created by binbin on 2018/11/18.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
    res.render('shopping');
})

module.exports = router;