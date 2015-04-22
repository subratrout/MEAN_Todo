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

// create a new todo and get all todos after create

app.post('/api/todos', function(req, res){
	Todo.create({text: req.body.text, done: false}, function(err, todo){
		if(err)
		{
			res.send(err);
		};
		Todo.find(function(err, todos){
			if(err)
			{
				res.send(drr)
			}
			else
			{
				res.json(todos);
			}
		})
	})
})

// delete a todo from list

app.get('/api/todos/:todo_id', function(req, res){
	Todo.remove({_id: req.params.todo_id}, function(err, todo){
		if(err)
		{
			res.send(err);
		}

		// return all todo after deleting one
		Todo.find(function(err, todos){
			if(err)
			{
				res.send(err);
			}
			else
			{
				res.json(todos);
			}
		})
	})
})

// application


//load index view file for angular
// app.get('*', function(req, res){
// 	res.sendfile(__dirname + '/public/index.html');
// })



// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 8000");