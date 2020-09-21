
 var dbcreation = require('./lib/config/dbCreation');	
var express = require('express'),
	path = require('path'),
	bodypareser = require('body-parser'),
	fs = require('fs'),
	env = require('./lib/config/env'),
	cryptconf = require('./lib/config/crypt.config');
	var crypto = require('crypto');
	var routes = require('./lib/routes');
	var dbBackup = require('./lib/config/dbBackup');
	var app = express();

	let http = require('http').Server(app);

app.use(bodypareser.urlencoded({limit:'100mb',extended:true}));
app.use(bodypareser.json({limit:'100mb'}));
	
app.use(express.static(path.join(__dirname,'app')));

routes.configure(app);

	dbcreation.createDB();
	dbcreation.CreateTables();

		// console.log(cryptconf.decrypt('b56e182c5da92b5fa3fec2ceedfdd7a7'))
dbBackup.GenerateBackup();

var server = app.listen(parseInt(cryptconf.decrypt(env.port)),function(){
	 console.log('server start', cryptconf.decrypt(env.port));
})	

 let io = require('socket.io')(server);
	require('./lib/config/socket.Ctrl')(io);

	server.timeout = 600000;

