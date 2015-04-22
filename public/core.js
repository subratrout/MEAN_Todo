var Todo = angular.module('Todo', []);

function mainController($scope, $http){
	$scope.formData = {};
	
	//get all todos and show
	$http.get('/api/todos').success(function(data){
		$scope.todos = data;
		console.log(data);
	}).error(function(data){
		console.log('Error'+data);
	});

	//send the data to node API when submitting add form

	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData).success(function(data){
			$scope.formData = {};
			$scope.todos = data;
		}).error(function(data){
			console.log("Error" +data);
		})
	}

	// select a todo after checking it

	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/'+id).success(function(data){
			$scope.todos = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: '+ data);
		})
	}
}