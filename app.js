var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware

const docker = require('./middleware/dockerStartup');

//Routes
app.use(require('./routes/account'));
app.use(require('./routes/get'));
app.use(require('./routes/list'));
app.use(require('./routes/create'));
app.use(require('./routes/edit'));
app.use(require('./routes/delete'));
app.use(require('./routes/generate'));
app.use(require('./routes/encode'));
app.use(require('./routes/restore'));
app.use(require('./routes/status'));
app.use(require('./routes/completion'));
app.use(require('./routes/share'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
}); 

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
