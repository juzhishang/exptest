var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// 创建express应用
var app = express();

// view engine setup
// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// 设置favicon路径为当前目录下的public/favicon.ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 会把请求打印出来（彩色字体），请求方法，路径，状态码，耗时
app.use(logger('dev'));
// 接收json请求，仅仅用来解析json格式，能接受body中任何Unicode编码的字符。支持自动的解析gzip和zlib。
app.use(bodyParser.json());
// 接收form请求，用来解析body中的urlencoded字符，只支持utf-8的编码的字符，同样也支持自动的解析gzip和zlib。
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 映射静态目录，实际目录当前文件夹下的public/stylesheets/style.css，访问目录是/stylesheets/style.css
app.use(express.static(path.join(__dirname, 'public')));

// 路由控制
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
// 404处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 上一个use中的next中的参数err在这里作为第一个参数传入
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
