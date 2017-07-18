import TodoService from './todo_service.js';
import Data from './todo_data.js';

class TodoControls {

	retrieveTodos($scope, $route, store) {
		let todoList = $scope;
		todoList.filters = TodoService.retrieveSearchFilters();
	    todoList.todos = TodoService.retrieveTodos(store.tasks);

	    if ($route.current.params) {
	      todoList.todos = TodoService.filterResults($route.current.params['filter'], todoList.todos);
	    }

	    return todoList;
	}

	retrieveTodoFilters() {
		return TodoService.retrieveSearchFilters();
	}

	retrieveTodoStates() {
		return TodoService.retrieveState();
	}

    retrieveSingleTodo($scope, $route, store) {
    	$scope.todo = store.tasks[$route.current.params.id];
	    $scope.todo = TodoService.retrieveSingleTodo($scope.todo);
    }

    createTodo($route, uuid, user) {
    	let todo = TodoService.retrieveSingleTodo([]);
    	todo.id = uuid;
    	todo.organisation = user.organisation;
	    return todo;
	}
}

module.exports = new TodoControls();