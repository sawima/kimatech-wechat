var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wechat = require('wechat');

var routes = require('./routes/index');
var app = express();

var config={
  token:'kimatechtestmyway',
  appid:'wxe9af2694a8b916f4',
  encodingAESKey:'bxwCg8jlpMQiMQb9MRDn7J01ACRCB5w7BhA6KivPUIZ'
};
//bxwCg8jlpMQiMQb9MRDn7J01ACRCB5w7BhA6KivPUIZ

var testconfig={
  token:'kimatestaccount',
  appid:'wxc97428da06937ec0'
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  // res.reply('sent it back'+message);
  res.reply({
    content:'sent it back'+message,
    type:'text'
  });
  // if (message.MsgType === 'device_text') {
  //   // 设备文本消息
  //   res.reply('这条回复会推到设备里去.');
  // } else if (message.MsgType === 'device_event') {
  //   if (message.Event === 'subscribe_status' ||
  //     message.Event === 'unsubscribe_status') {
  //   //WIFI设备状态订阅,回复设备状态(1或0)
  //     res.reply(1);
  //   } else {
  //     res.reply('这条回复会推到设备里去.')
  //   }
  // }
}));

app.use('/test',wechat(testconfig,function(req,res,next) {
  var message=req.weixin;
  res.reply({
    content:'sent it back'+message,
    type:'text'
  });
}));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
