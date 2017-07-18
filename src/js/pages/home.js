
class Home {

	constructor() {
		this.isSignedIn 	= window.sessionStorage.password && window.sessionStorage.email ? true : false;
		this.hasAccount 	= false;
		this.user 			= {};
		this.error;
		this.action 		= this.hasAccount === true ? 'login' : 'create my account';
	}

	submit(Firebase, $route, $location, $scope) {
		if ($scope.hasAccount) {
			Firebase.logIn($scope.user).then(
				(response) => { _redirect($route, $location, 'overview') }, 
				(error) => {
					$scope.$apply(function () { 
						$scope.error = 'Sorry, login failed. Try again';
					});
				});

		} else {
			Firebase.create($scope.user).then(
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

	logout(Firebase) {
		Firebase.logOut().then(() => { location.reload() });
	}
}

function _redirect($route, $location, routeValue) {
	if ($location && routeValue) { $location.path(routeValue); }
	$route.reload();
}

module.exports = Home;