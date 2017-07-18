
class Todo {

	constructor(TodoControls, $scope, $route, Firebase) {
		this.taskList = TodoControls.retrieveSingleTodo($scope, $route, Firebase);
		this.todoStates = TodoControls.retrieveTodoStates();
		this.editable = false;
		this.isAdmin = Firebase.user.admin;
		this.taskDates = {
			start : moment($scope.todo.dateStart).format('YYYY-MM-DD'),
			end : moment($scope.todo.dateEnd).format('YYYY-MM-DD'),
			total : moment($scope.todo.dateEnd).fromNow()
		}
	}

    update($scope, Firebase) {
	    if ($scope.editable) {  
	        let compareObj = JSON.stringify($scope.todo); 
	        if ($scope.backup != compareObj) {
	          $scope.backup = JSON.stringify($scope.todo);
	          Firebase.updateTask(JSON.parse(compareObj));
	        }

	    } else {
	        $scope.backup = JSON.stringify($scope.todo);
	    }

	    $scope.editable = !$scope.editable;
	}

    cancel($scope) {
	    $scope.editable = !$scope.editable;
	    $scope.todo = JSON.parse($scope.backup);
	}

	archiveTodo($scope, Firebase) {
		let compareObj = JSON.stringify($scope.todo); 
		Firebase.moveTask(JSON.parse(compareObj), 'archive');
	}

	reactivateTodo($scope, Firebase) {
		let compareObj = JSON.stringify($scope.todo); 
		Firebase.moveTask(JSON.parse(compareObj), 'tasks');
	}

	deleteTodo($scope, Firebase) {
		Firebase.deleteTask($scope.todo.id);
		history.back();
	}
}

module.exports = Todo;