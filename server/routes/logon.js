/**
 * Created by binbin on 2018/11/15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logon_test');
});

module.exports = router;
