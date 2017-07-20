
class Todo {

	constructor($scope, $route, Firebase, TodoControls) {
		this.taskList = TodoControls.retrieveSingleTodo($scope, $route, Firebase);
		this.todoStates = TodoControls.retrieveTodoStates();
		this.editable = false;

		this.user = Firebase.user;
		this.isAdmin = this.user.admin;

		this.taskDates = {
			start : moment($scope.todo.dateStart).format('YYYY-MM-DD'),
			end : moment($scope.todo.dateEnd).format('YYYY-MM-DD'),
			total : moment($scope.todo.dateEnd).fromNow()
		}

		this.comment = {};
		this.reply = [];
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

	// Comments Section
	addComment($scope, Firebase, uuidGen) {
		Firebase.addComment($scope.todo.id, $scope.comment, uuidGen.v4());
	}

	replyToComment($scope, commentId, Firebase, uuidGen) {
		let buildReply = $scope.reply[commentId];
		buildReply.from = this.user.id;
		buildReply.name = this.user.name;

		Firebase.addReplyToComment($scope.todo.id, commentId, buildReply, uuidGen.v4());
	}
}

module.exports = Todo;