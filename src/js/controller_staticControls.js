import Firebase from './firebase.js';

class StaticPage {

	home($scope, $location, $route) {
		let main = $scope;
		main.heading = 'Welcome Stranger!';
		main.account = 'not-active';
		main.action = (main.account === 'active') ? 'login' : 'create my account';
		main.login = {
			email: '', 
			password: '',
			admin: false
		}

		main.toggleAccount = function(status) {
	  		main.account = status;
	  		main.action = (status === 'active') ? 'login' : 'create my account';
		}
		main.submit = function() {
			Firebase.logUserIn(main.account, main.login).then((response) => {
				$location.path('overview');
				$route.reload();
			}, (error) => {
				alert('Sorry, login failed. Try again');
			});
		}
	};

	about($scope) {
		$scope.heading = 'Why go Modular?';
		$scope.description = 'Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.';
		$scope.quote = 'In object-oriented programming, the use of interfaces as an architectural pattern to construct modules is known as interface-based programming - Modular Programming found on Wikipedia';
	};

	overview($scope) {
		$scope.heading = 'Welcome User...';
	};
}

module.exports = new StaticPage();