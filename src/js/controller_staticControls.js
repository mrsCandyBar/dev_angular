
class StaticPage {

	home($scope) {
		let main = $scope;
		main.heading = 'Welcome Stranger!';
		main.account = 'not-active';

		main.toggleAccount = function(status) {
	  		main.account = status;
		}
	};

	about($scope) {
		$scope.heading = 'About';
	};

	overview($scope) {
		$scope.heading = 'Welcome User...';
	};
}

module.exports = new StaticPage();