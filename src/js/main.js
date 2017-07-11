import TodoService from './todo-service.js';
import Data from './todo-exampleData.js';

var globalMenuItems = ['home', 'about', 'overview', 'archive'];
    globalMenuItems = _createRouteObj(globalMenuItems);


angular.module('myApp', ['ngRoute', 'tabsComponent'])

  .config(function($routeProvider) {
    let menuItem, menuName;
    Object.keys(globalMenuItems).forEach((item) => {
      menuItem = globalMenuItems[item];
      menuName = menuItem['page']

      $routeProvider.when('/' + menuName, {
        controller: menuName + 'Controls',
        templateUrl: 'template/' + menuName + '.html'
      })

      if (menuItem['submenu']) {
        menuItem = menuItem['submenu'];
        Object.keys(menuItem).forEach((subitem) => {
          menuName = menuItem[subitem]['routeName']

          $routeProvider.when('/' + menuName, {
            controller: menuName + 'Controls',
            templateUrl: 'template/' + menuName + '.html'
          })
        });
      }
    });
   
    $routeProvider
      .when('/overview/:filter', {
        controller: 'overviewControls',
        templateUrl: 'template/overview.html'
      })
      .when('/todo/:name', {
        controller: 'todoControls',
        templateUrl: 'template/todo.html'
      })
      .when('/create', {
        controller: 'createControls',
        templateUrl: 'template/todo_create.html'
      });

    $routeProvider
      .otherwise({
        redirectTo:'/home'
      });
  })

  // MENU
  .controller('MenuControls', function($rootScope) {
    let menu = this;
    menu.items = globalMenuItems;

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      menu.activeRoot = current.$$route.templateUrl;
      Object.keys(menu.items).forEach(item => {
        menu.items[item]['isActive'] = (menu.activeRoot.indexOf(menu.items[item]['page']) > -1) ? true : false;
      });
    });
  })

  // PAGES  
  // Make this a dashboard

  .controller('todoListControls', function($route) {

    let todoList = this;
    todoList.filters = TodoService.retrieveSearchFilters();
    todoList.todos = TodoService.retrieveTodos(Data.example);

    // filter data
    if ($route.current.params) {
      todoList.todos = TodoService.filterResults($route.current.params['filter'], todoList.todos);
    }
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
  })

  .controller('todoControls', function($scope) {
    // get data from DB
    $scope.todo = TodoService.retrieveSingleTodo(Data.example[0]);
    $scope.editable = false;

    $scope.update = function() {
      if ($scope.editable) {
        
        let compareObj = JSON.stringify($scope.todo); 
        if ($scope.backup != compareObj) {
          $scope.backup = JSON.stringify($scope.todo);
          // add command to update data to DB;
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
  })

  .controller('createControls', function($scope) {
    // get data from DB
    $scope.todo = TodoService.retrieveSingleTodo([]);
    $scope.users = Data.users;
    $scope.urgencies = Data.urgencies;
    $scope.statuses = Data.statuses;

    $scope.submit = function() {
      // generate random UID for todo;
      console.log('new update >>>', $scope.todo);
      // add command to update data to DB;
    }
  })

  // replace this with some fun stats based on user data returned
  .controller('beersControls', function($scope, $locale) {
    $scope.beers = [0, 1, 2, 3, 4, 5, 6];

    if ($locale.id == 'en-us') {
      $scope.beerForms = {
        0: 'no beers',
        one: '{} beer',
        other: '{} beers'
      };
    } else {
      $scope.beerForms = {
        0: 'žiadne pivo',
        one: '{} pivo',
        few: '{} pivá',
        other: '{} pív'
      };
    }
  })

  .controller('homeControls', function($scope) {
    let main = $scope;
    main.heading = 'Welcome Stranger!';
    main.account = 'not-active';

    main.toggleAccount = function(status) {
      main.account = status;
    }
  })

  .controller('aboutControls', function($scope) {
    $scope.heading = 'About';
  })

  .controller('overviewControls', function($scope) {
    $scope.heading = 'Welcome User...';
  });



// Additional private functions
function _createRouteObj(arr) {
  let route = "index.html#!";
  let routeObj = {};

  arr.forEach((page, index) => {
    if (page.indexOf('_') > -1) {
      let menuOptions = page.split('_');
      let mainMenuItem = menuOptions[0];
      let subMenuItem = menuOptions[1];

      if (!routeObj[mainMenuItem]['submenu']) {
        routeObj[mainMenuItem]['submenu'] = {};
      }

      routeObj[mainMenuItem]['submenu'][subMenuItem] = {
        page: subMenuItem,
        routeName: page,
        url: route + '/' + page
      }

    } else {
      routeObj[page] = {
        page,
        url: route + '/' + page
      }
    }
  });

  return routeObj;
}