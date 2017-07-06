var globalMenuItems = createRouteObj(['home','about','edit','beers']);
angular.module('myApp', ['ngRoute', 'tabsComponent'])

  .config(function($routeProvider) {
    globalMenuItems.forEach((item) => {
      $routeProvider.when('/' + item.page, {
        templateUrl: 'template/' + item.page + '.html'
      })
    });
   
    $routeProvider
      .otherwise({
        redirectTo:'/'
      });
  })

  .controller('MenuControls', function() {
    let menu = this;
    menu.items = globalMenuItems;
    menu.select = ((selectedItem) => {
      menu.items.forEach(item => {
        item.isActive = (item === selectedItem) ? true : false;
      });
    });
  })

  .controller('TodoControls', function() {
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

  .controller('BeersControls', function($scope, $locale) {
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


// Additional functions
function createRouteObj(arr) {
  let route = "index.html#!";
  let routeObj = [];

  arr.forEach((page, index) => {
    routeObj[index] = {
      page,
      url: route + '/' + page
    }
  });

  return routeObj;
}