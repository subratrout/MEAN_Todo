//set up 
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//Configuration

mongoose.connect('mongodb://localhost/FullMean_todo');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



//Define model
var Todo = mongoose.model('Todo', {text:String})
// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 8000");


// Express Routes

//api 
// get all todos

app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if(err){
			res.send(err);
		}
		res.json(todos);
	})
});


