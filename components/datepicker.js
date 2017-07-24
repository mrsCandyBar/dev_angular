
angular.module('datePickerComponent', [])
 
  .directive('datepicker', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {

      	// Create MonthDaysObj
      	$scope._createDays = function(monthTitle, amount) {
			let month = {
				title: monthTitle,
				days: [],
				placeholder: []
			};
			for( let i = 0; i <= amount; i++) { 
				month.days[i] = i=== 0 ? '' : i; 
			};
			return month;
		}

		// Create YearsObj
		$scope._createYears = function(currentYear, amount) {
			let year = []
			for( let i = 0; i < amount; i++) { 
				year[i] = currentYear + i; 
			};
			return year;
		}

		// Setup Properties for DatePicker
      	$scope.dateComponents = {
      		days: [
      			'Sun',
      			'Mon',
      			'Tue',
      			'Wed',
      			'Thu',
      			'Fri',
      			'Sat'
      		],
      		months: [
	      		$scope._createDays('January', 	31),
	      		$scope._createDays('February', 	29),
				$scope._createDays('March', 	31),
				$scope._createDays('April', 	30),
				$scope._createDays('May', 		31),
				$scope._createDays('June', 		30),
				$scope._createDays('July', 		31),
				$scope._createDays('August', 	31),
				$scope._createDays('September', 30),
				$scope._createDays('October', 	31),
				$scope._createDays('November', 	30),
				$scope._createDays('December', 	31)
			],
			years: $scope._createYears(new Date().getFullYear(), 8),

			selectedYear: new Date().getFullYear(),
			selectedMonth: new Date().getMonth() + 1,
			selectedDay: new Date().getDate(),
			selectedDate: new Date(),

			dateSelection: ['year','month','day'],
			openSelection: ''
		}
		_calculateDayMonthStartsOn($scope.dateComponents.selectedMonth);

		$scope._showOptions = function(option) {
        	$scope.dateComponents.openSelection = $scope.dateComponents.openSelection === option ? '' : option;
        }

		// Update DOM with values selected
        $scope.setDate = function(value) {
        	if (value) {
	        	if ($scope.dateComponents.openSelection === 'year') {
	        		$scope.dateComponents.selectedYear = value;

	        	} else if ($scope.dateComponents.openSelection === 'month') {
	        		$scope.dateComponents.selectedMonth = value;
	        		_calculateDayMonthStartsOn($scope.dateComponents.selectedMonth - 1);

	        	} else {
	        		$scope.dateComponents.selectedDay = value;
	        	}

	          _update();
	      	}
        }

        function _update() {
        	let createDate = '';
        	createDate += $scope.dateComponents.selectedYear + '-';
        	createDate += $scope.dateComponents.selectedMonth + '-';
        	createDate += $scope.dateComponents.selectedDay;

        	_isLeapYear($scope.dateComponents.selectedYear);
        	$scope.dateComponents.selectedDate = createDate;
        	$scope.dateComponents.openSelection = '';
        }

        function _calculateDayMonthStartsOn(month) {
        	let selectedMonth = $scope.dateComponents.selectedMonth - 1;
        	let date = new Date();
        	date.setFullYear($scope.dateComponents.selectedYear, selectedMonth,1);

        	$scope.dateComponents.months[selectedMonth].placeholder = [];
        	for (let i = 1; i < date.getDay(); i++) {
        		$scope.dateComponents.months[selectedMonth].placeholder.unshift(i);
        	}

        	if ($scope.dateComponents.selectedDay > $scope.dateComponents.months[$scope.dateComponents.selectedMonth - 1].days.length) {
    			$scope.dateComponents.openSelection = '';
    			$scope.setDate($scope.dateComponents.months[$scope.dateComponents.selectedMonth - 1].days.length - 1);
    		}
        }

        function _isLeapYear(year) {
        	if (year % 4 == 0 && year % 100 != 0 || 
        		year % 400 == 0) {
         		if ($scope.dateComponents.months[1].days.length < 30) {
		    	 	$scope.dateComponents.months[1].days[29] = 29;
		    	} 
		    	
		    } else {
		    	if ($scope.dateComponents.months[1].days.length > 29) {
		    		$scope.dateComponents.months[1].days.splice(29,1);
		    	}
		    };
        }
      },
      template:
        '<div class="dp__holder">' +

        	'<h3>' +
        		'<a ng-click="_showOptions(dateComponents.dateSelection[0])">{{ dateComponents.selectedYear }}</a> - ' +
        		'<a ng-click="_showOptions(dateComponents.dateSelection[1])">{{ dateComponents.selectedMonth }}</a> - ' +
        		'<a ng-click="_showOptions(dateComponents.dateSelection[2])">{{ dateComponents.selectedDay }}</a>' +
        	'</h3>' +

        	'<ul class="dp__dateYear" ng-show="dateComponents.openSelection === dateComponents.dateSelection[0]">' +
	            '<li ng-repeat="year in dateComponents.years" ng-click="setDate(year)" ' +
	            	'class="{{ dateComponents.selectedYear === year ? \'active\' : \'\' }}">' +
	            	'<a>{{ year }}</a>' +
	            '</li>' +
            '</ul>' +

        	'<ul class="dp__dateTitle" ng-show="dateComponents.openSelection === dateComponents.dateSelection[1]">' +
	            '<li ng-repeat="month in dateComponents.months" ng-click="setDate($index + 1)"' +
	            	'class="{{ dateComponents.selectedMonth === $index + 1 ? \'active\' : \'\' }}">' +
	            	'<a>{{ month.title }}</a>' +
	            '</li>' +
	        '</ul>' +


	        '<ul class="dp__dateDay" ng-show="dateComponents.openSelection === dateComponents.dateSelection[2]">' +
	            '<li ng-repeat="day in dateComponents.days"><a>{{ day }} </a></li>' +
	        '</ul>' +

	        '<ul class="dp__dateMonth__holder" ng-show="dateComponents.openSelection === dateComponents.dateSelection[2]">' +
	            '<li ng-repeat="day in dateComponents.months[(dateComponents.selectedMonth - 1)].placeholder">' +
	          		'<a>&nbsp;</a>' +
	          	'</li>' +

	            '<li ng-repeat="day in dateComponents.months[(dateComponents.selectedMonth - 1)].days" ng-click="setDate(dateComponents.months[(dateComponents.selectedMonth - 1)].days[day])"' +
	            	'class="{{ dateComponents.selectedDay === dateComponents.months[(dateComponents.selectedMonth - 1)].days[day] ? \'active\' : \'\' }}">' +
	          		'<a>&nbsp;{{ dateComponents.months[(dateComponents.selectedMonth - 1)].days[day] }}</a>' +
	          	'</li>' +
	        '</ul>' +

        '</div>',
      	replace: true
    };
  });