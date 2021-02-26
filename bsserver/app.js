var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入body-parser中间件
var bodyParser=require('body-parser');

//引入路由器
var userRouter=require('./routes/user');
var productRouter=require('./routes/product');
var adminRouter=require('./routes/admin');
var discussRouter=require('./routes/discuss');
var indexRouter=require('./routes/index');

//创建web服务器
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended:false
}))

//使用路由器中间件
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/admin',adminRouter);
app.use('/discuss',discussRouter);
app.use('/index',indexRouter);

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
