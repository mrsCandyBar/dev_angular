angular.module('myApp', ['ngRoute', 'tabsComponent'])

  .config(function($routeProvider) {
    /*var resolveProjects = {
      projects: function (Projects) {
        return Projects.fetch();
      }
    };*/
   
    $routeProvider
      .when('/', {
        controller:'TodoListController',
        templateUrl:'template/todo.html'
      })
      .when('/about', {
        controller:'TodoListController as todoList',
        templateUrl:'template/about.html'
      })
      .when('/edit', {
        controller:'TodoListController as todoList',
        templateUrl:'template/edit.html'
      })
      .when('/beers', {
        controller: 'BeerCounter',
        templateUrl: 'template/beerCounter.html'
      })
      .otherwise({
        redirectTo:'/'
      });
  })

  .controller('TodoListController', function() {

    var todoList = this;
    todoList.todos = [
      {text:'learn AngularJS test', done:true},
      {text:'build an AngularJS app', done:false}];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };

  })

  .controller('BeerCounter', function($scope, $locale) {
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
  });