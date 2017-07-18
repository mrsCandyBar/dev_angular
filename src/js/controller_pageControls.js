import Store from './store.js';
import Firebase from './firebase.js';
import TodoControls from './todo_controls.js';

class Pages {

	constructor(Store) {
		this.isAdmin = Store.isAdmin;
	}

	home($scope, $location, $route) {
		$scope.isSignedIn 	= Store.isSignedIn
		$scope.hasAccount 	= false;
		$scope.user 		= {};
		$scope.error;
		$scope.action 		= $scope.hasAccount === true ? 'login' : 'create my account';

		$scope.submit = function(account) {
			if ($scope.hasAccount) {
				Firebase.logIn($scope.user).then(
					(response) => { _redirect($route, $location, 'overview') }, 
					(error) => {
						$scope.$apply(function () { 
							$scope.error = 'Sorry, login failed. Try again';
						});
					});

			} else {
				Firebase.createUser($scope.login).then(
					(response) => { _redirect($route, $location, 'overview') }, 
					(error) => {
						$scope.$apply(function () { 
							$scope.error = 'Sorry, something went wrong with your account creation. <br>';
							$scope.error += 'Your account will be created once we fix the problem. <br>';
							$scope.error += '- sincerly, Admin'
							// send fail email to admin with $scope.user details
						});
					})
			}
		}

		$scope.logout = function() {
			Firebase.logUserOut().then(() => { location.reload() });
		}
	};

	about($scope) {
		$scope.heading = 'Why go Modular?';
		$scope.description = 'Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.';
		$scope.quote = 'In object-oriented programming, the use of interfaces as an architectural pattern to construct modules is known as interface-based programming - Modular Programming found on Wikipedia';
	};

	overview($scope, $route) {
		if (Firebase.userID) {
			if (!Firebase.user) {
				Firebase.setupOverviewPage().then((resolve) => {
					console.log('restarting ...');
					_redirect($route);

				}, (error) => {
					alert('Oops something went wrong... this is awkward', error);
				});

			} else {
				$scope.user = Firebase.user;
				$scope.taskList = TodoControls.retrieveTodos($scope, $route, Firebase);
				console.log('task list loaded');

				Firebase.taskUpdate().then((response) => {
					console.log('restarting ...');
					_redirect($route);

				}, (reject) => { console.log('No updates to Task Data recieved'); })
			}
		}
	};

	todo($scope, $route) {
		$scope.taskList = TodoControls.retrieveSingleTodo($scope, $route, Firebase);
		$scope.todoStates = TodoControls.retrieveTodoStates();
		$scope.editable = false;
		$scope.isAdmin = Firebase.user.admin;
		$scope.taskDates = {
			start : moment($scope.todo.dateStart).format('YYYY-MM-DD'),
			end : moment($scope.todo.dateEnd).format('YYYY-MM-DD'),
			total : moment($scope.todo.dateEnd).fromNow()
		}

	    $scope.update = function() {
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

	    $scope.cancel = function() {
		    $scope.editable = !$scope.editable;
		    $scope.todo = JSON.parse($scope.backup);
		}

		$scope.archiveTodo = function() {
			let compareObj = JSON.stringify($scope.todo); 
			Firebase.moveTaskToArchive(JSON.parse(compareObj));
		}

		$scope.reactivateTodo = function() {
			let compareObj = JSON.stringify($scope.todo); 
			Firebase.reactivateTask(JSON.parse(compareObj));
		}

		$scope.deleteTodo = function() {
			Firebase.deleteTask($scope.todo.id);
			history.back();
		}
	};

	create($scope, $route, uuid) {
		$scope.todo = TodoControls.createTodo($route, uuid, Firebase.user);
		$scope.todoStates = TodoControls.retrieveTodoStates();
		$scope.allUsers = Firebase.allUsers;

			// update user list if user list is outdated;
			Firebase.retrieveUsers().then((response) => {
				_redirect($route);

			}, (reject) => {
				console.log('user data not changed', reject);
			});
		
		
		$scope.submit = function() {
			if ($scope.todo.user) {
				let user = JSON.parse($scope.todo.user);
				$scope.todo.username = user['name'];
				$scope.todo.user = user['id'];
			    Firebase.updateTask($scope.todo);
			    alert('Todo Created');

			    history.back();
			} else {
				alert('Please select a user');
			}
		}
	};

	archive($scope, $route) {
		if (Firebase.userID) {
			if (!Firebase.user) {
				Firebase.setupArchivePage().then((resolve) => {
					console.log('restarting ...');
					_redirect($route);

				}, (error) => {
					alert('Oops something went wrong... this is awkward', error);
				});

			} else {
				$scope.user = Firebase.user;
				$scope.taskList = TodoControls.retrieveTodos($scope, $route, Firebase);
				console.log('task list loaded', $scope.taskList);

				Firebase.taskUpdate('archive').then((response) => {
					console.log('archive restarting ...');
					_redirect($route);

				}, (reject) => { console.log('No updates to Task Data recieved'); })
			}
		}
	};
}

function _redirect($route, $location, route) {
	if ($location && route) { $location.path('overview'); }
	$route.reload();
}

module.exports = new Pages(Store);