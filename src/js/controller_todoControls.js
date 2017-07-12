import TodoService from './todo_service.js';
import Data from './todo_data.js';

class TodoControls {

	retrieveTodos($scope, $route) {
		let todoList = $scope;
	    todoList.filters = TodoService.retrieveSearchFilters();
	    todoList.todos = TodoService.retrieveTodos(Data.example);

	    // filter data
	    if ($route.current.params) {
	      todoList.todos = TodoService.filterResults($route.current.params['filter'], todoList.todos);
	    }

	    return todoList;
	}

	addTodo() {
      	todoList.todos.push({text:todoList.todoText, done:false});
      	todoList.todoText = '';
    };

    retrieveSingleTodo($scope) {
    	// get data from DB
	    $scope.todo = TodoService.retrieveSingleTodo(Data.example[0]);
	    $scope.editable = false;

	    $scope.update = function() {
		    if ($scope.editable) {  
		        let compareObj = JSON.stringify($scope.todo); 
		        if ($scope.backup != compareObj) {
		          $scope.backup = JSON.stringify($scope.todo);
		          // add command to update data to DB;
		        }

		    } else {
		        $scope.backup = JSON.stringify($scope.todo);
		    }

		    $scope.editable = !$scope.editable;
		}

	    $scope.cancel = function() {
		    $scope.editable = !$scope.editable;
		    $scope.todo = JSON.parse($scope.backup);
		}
    }

    createTodo($scope) {
	    // get data from DB
	    $scope.todo = TodoService.retrieveSingleTodo([]);
	    $scope.users = Data.users;
	    $scope.urgencies = Data.urgencies;
	    $scope.statuses = Data.statuses;

	    $scope.submit = function() {
	      // generate random UID for todo;
	      console.log('new update >>>', $scope.todo);
	      // add command to update data to DB;
	    }
	}
}

module.exports = new TodoControls();