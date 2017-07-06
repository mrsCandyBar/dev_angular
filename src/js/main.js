var globalMenuItems = ['home', 'about', 'edit', 'todo', 'beers'];
    globalMenuItems = createRouteObj(globalMenuItems);

angular.module('myApp', ['ngRoute', 'tabsComponent'])

  .config(function($routeProvider) {

    // add option to replace templateUrl value
    globalMenuItems.forEach((item) => {
      $routeProvider.when('/' + item.page, {
        controller: item.page + 'Controls',
        templateUrl: 'template/' + item.page + '.html'
      })
    });
   
    $routeProvider
      .otherwise({
        redirectTo:'/home'
      });
  })

  // MENU
  .controller('MenuControls', function() {
    let menu = this;
    menu.items = globalMenuItems;
    menu.select = ((selectedItem) => {
      menu.items.forEach(item => {
        item.isActive = (item === selectedItem) ? true : false;
      });
    });
  })

  // PAGES  
  // Make this a dashboard
  .controller('homeControls', function($scope) {
    $scope.heading = 'Welcome';
  })
  .controller('aboutControls', function($scope) {
    $scope.heading = 'About';
  })

  // Remove this and place as a option to edit data on dashboard
  .controller('editControls', function($scope) {
    $scope.heading = 'Edit ';
  })

  // REDO, make this fit into firebase
  .controller('todoControls', function() {
    let todoList = this;
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