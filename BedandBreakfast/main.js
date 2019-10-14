var express = require('express');
var app = express();
var formidable = require('formidable');
// set up handlebars view engine
var handlebars = require('express-handlebars').create({
 defaultLayout:'main',
 helpers: {
 section: function(name, options){
 if(!this._sections) this._sections = {};
 this._sections[name] = options.fn(this);
 return null;
 }
 }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended:true}));



app.set('port', process.env.PORT || 3001);

if( app.thing == null ) console.log( 'bleat!' );

app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

app.get('/', function(req, res) {
 res.render('home');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
