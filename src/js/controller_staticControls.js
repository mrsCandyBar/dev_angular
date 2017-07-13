import Firebase from './firebase.js';

class StaticPage {

	constructor() {
		this.user;
		this.isAdmin = false;
	}

	home($scope, $location, $route) {
		let main = $scope;
		main.heading = 'Welcome Stranger!';
		main.account = 'not-active';
		main.action = (main.account === 'active') ? 'login' : 'create my account';
		main.login = {
			email: '', 
			password: '',
			organisation: '',
			name: '',
			admin: false
		}

		main.toggleAccount = function(status) {
	  		main.account = status;
	  		main.action = (status === 'active') ? 'login' : 'create my account';
		}
		main.submit = function() {
			if (main.account === 'active') {
				Firebase.logUserIn(main.login).then((response) => {
					main.redirect();

				}, (error) => {
					alert('Sorry, login failed. Try again');
				});

			} else {
				Firebase.createUser(main.login).then((response) => {
					main.redirect();

				}, (error) => {
					console.log('oh crap >>>', error);
				})
			}
		}

		main.redirect = function() {
			$location.path('overview');
			$route.reload();
		}
	};

	about($scope) {
		$scope.heading = 'Why go Modular?';
		$scope.description = 'Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.';
		$scope.quote = 'In object-oriented programming, the use of interfaces as an architectural pattern to construct modules is known as interface-based programming - Modular Programming found on Wikipedia';
	};

	overview($scope) {
		console.log('user >>', Firebase.user)
		$scope.heading = 'Welcome ' + 'User';
	};
}

module.exports = new StaticPage();