var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logonRouter = require('./routes/logon');
var mainRouter = require('./routes/main');
var goodsRouter = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置跨域请求头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//登陆拦截
// app.use((req,res,next)=>{
//   if(req.cookie.userId){
//     next();
//   }else{
//     if(req.originalUrl == '/users'){
//       next();
//     }else{
//         req.flash('error', '请先登录');
//         res.redirect('/user/login');
//       res.json({
//           status:'10001',
//           msg:'当前未登录',
//           result:''
//       })
//     }
//   }
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logon',logonRouter);
app.use('/main',mainRouter);
app.use('/goods',goodsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
