'use strict';

// module dependencies
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  helmet = require('helmet'),
  passport = require('passport'),
  mongoStore = require('connect-mongo')({
    session: session
  }),
  flash = require('connect-flash'),
  config = require('./config'),
  consolidate = require('consolidate'),
  path = require('path');

module.exports = function(db) {

  // initialize express app
  var app = express();

  // globbing model files
  config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath){
    require(path.resolve(modelPath));
  });

  // setting application local variables
  app.locals.title        = config.app.title;
  app.locals.description  = config.app.description;
  app.locals.keywords     = config.app.keywords;

  // passing the request url to environment locals
  app.use(function(req, res, next) {
    res.locals.url = req.protocol + "://" + req.headers.host + req.url;
    next();
  }); 

  // should be placed before express.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  app.set('showStackError', true);

  // environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // enable logger (morgan)
    app.use(morgan('dev'));

    // disable views cache
    app.set('view cache', false);
  }  else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  // enable jsonp
  app.enable('jsonp callback');

  // cookieParser should be above session
  app.use(cookieParser());

  // express mongodb session storage
  app.use(session({
    secret: config.sessionSecret,
    store: new mongoStore({
      db: db.connection.db,
      collection: config.sessionCollection
    })
  })); 

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages
  app.use(flash());

  // use helmet to secure express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  // setting the app router and static folder
  // app.use(express.static(path.resolve('./public')));

  // globbing routing files
  config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });

  // assume 'not found' in the error msgs is a 404, this 
  // is somewhat silly, but valid, you can do whatever
  // you like, set properties, use instanceof etc.
  // app.use(function(err, req, res, next) {
  //   // if the error object doesn't exist
  //   if (!err) return next();

  //   // log it 
  //   console.error(err.stack);

  //   // error page 
  //   res.status(500).render('500', {
  //     error: err.stack
  //   });
  // });

  // // assume 404 since no middleware responded
  // app.use(function(req, res) {
  //   res.status(404).render('404', {
  //     url: req.originalUrl,
  //     error: 'Not Found'
  //   });
  // });

  return app;
};