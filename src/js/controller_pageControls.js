import Home from './pages/home.js';
import Todo from './pages/todo.js';
import Create from './pages/todo_create.js';

class Pages {

	/*constructor(Store) {
		this.isAdmin = Store.isAdmin;
	}*/

	home($scope, $location, $route, Store, Firebase) {
		let homeObj = new Home(Store);
		$scope = _buildScope(homeObj, $scope);

		$scope.submit = function() { homeObj.submit(Firebase, $route, $location, $scope); }
		$scope.logout = function() { homeObj.logout(Firebase); }
	};

	about($scope) {
		$scope.heading 		= 'Why go Modular?';
		$scope.description 	= 'Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.';
		$scope.quote 		= 'In object-oriented programming, the use of interfaces as an architectural pattern to construct modules is known as interface-based programming - Modular Programming found on Wikipedia';
	};

	todo($scope, $route, Firebase, TodoControls) {
		let todoObj = new Todo(TodoControls, $scope, $route, Firebase);
		$scope = _buildScope(todoObj, $scope);
		
		$scope.update = function() 			{ todoObj.update($scope, Firebase) }
    	$scope.cancel = function() 			{ todoObj.cancel($scope) }
		$scope.archiveTodo = function() 	{ todoObj.archiveTodo($scope, Firebase) }
		$scope.reactivateTodo = function() 	{ todoObj.reactivateTodo($scope, Firebase) }
		$scope.deleteTodo = function() 		{ todoObj.deleteTodo($scope, Firebase) }
	};

	create($scope, $route, uuid, Firebase, TodoControls) {
		let createObj = new Create(TodoControls, $scope, $route, uuid, Firebase);
		$scope = _buildScope(createObj, $scope);

		$scope.submit = function() { createObj.submit($scope, Firebase) }
	};
}

function _buildScope(pageObj, $scope) {
	Object.keys(pageObj).forEach((key) => {
		$scope[key] = pageObj[key];
	});

	return $scope;
}

module.exports = new Pages();