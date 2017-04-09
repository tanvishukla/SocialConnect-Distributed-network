
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var ajax = require('./routes/ajax');

//var home = require('./public/home');
var index=require('./routes/index');
var home=require('./routes/home');
var logout=require('./routes/logout');
var profile=require('./routes/profile');
var friends=require('./routes/friends');
var app = express();
var session=require('client-sessions');


app.use(session({
	
	cookieName: 'session',
	secret: 'user1',
	duration: 30 * 60 * 1000,
	activeDuration : 5 * 6 * 1000,
	
}));



// all environments
app.set('port', process.env.PORT || 4560);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.get);
//app.get('/ajax', ajax.demo);
//app.get('/signin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.post('/afterSignUp', home.afterSignUp);
app.get('/wall',home.redirectToHomepage);
//app.get('/myprofile',home.redirectToHomepage);
//app.get('/profile1',home.redirectToHomepage);
app.post('/logout',logout.logout);
app.post('/profile',profile.profile);
app.post('/showfriends',profile.showfriends);
app.post('/showGroups',profile.showGroups);
app.post('/createGroup',profile.createGroup);
app.get('/goTocreateGroup',profile.goTocreateGroup);
app.post('/deleteGroup',profile.deleteGroup);
app.get('/editProfile',profile.editProfile);
app.post('/saveProfile',profile.saveProfile);
app.post('/showInterests',profile.showInterests);
//app.post('/wall',profile.redirectToHomepage);

//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
