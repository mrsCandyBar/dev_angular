import Menu from './controller_menuControls.js';
import StaticPage from './controller_staticControls.js';
import TodoService from './todo-service.js';
import Data from './todo-exampleData.js';

var globalMenuItems = Menu.buildMenu(['home', 'about', 'overview', 'archive']);

angular.module('myApp', ['ngRoute', 'tabsComponent'])

  .config(function($routeProvider) { 
    Menu.setRoutesWithBuiltMenu($routeProvider, globalMenuItems); 

    // set custom urls
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
      })

    // set route for unknown routes
    $routeProvider
      .otherwise({
        redirectTo:'/home'
      })
  })

  // MENU
  .controller('MenuControls', function($rootScope) { 
    Menu.initMenu(this, $rootScope, globalMenuItems) 
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
/*
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
  })*/

  .controller('homeControls', function($scope)      { StaticPage.home($scope) })
  .controller('aboutControls', function($scope)     { StaticPage.about($scope) })
  .controller('overviewControls', function($scope)  { StaticPage.overview($scope) })
  .controller('archiveControls', function($scope)   { StaticPage.overview($scope) })