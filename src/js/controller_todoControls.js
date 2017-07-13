import TodoService from './todo_service.js';
import Data from './todo_data.js';

class TodoControls {

	retrieveTodos($scope, $route, store) {
		let todoList = $scope;
		todoList.filters = TodoService.retrieveSearchFilters(store.tasks[0]);
	    todoList.todos = TodoService.retrieveTodos(store.tasks);

	    if ($route.current.params) {
	      todoList.todos = TodoService.filterResults($route.current.params['filter'], todoList.todos);
	    }

	    return todoList;
	}

    retrieveSingleTodo($scope, $route, store) {
    	$scope.todo = store.tasks[$route.current.params.id];
	    $scope.todo = TodoService.retrieveSingleTodo($scope.todo);
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