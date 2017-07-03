angular.module('myApp', ['ngRoute'])

  .config(function($routeProvider) {
    /*var resolveProjects = {
      projects: function (Projects) {
        return Projects.fetch();
      }
    };*/
   
    $routeProvider
      .when('/', {
        controller:'TodoListController as todoList',
        templateUrl:'template/home.html'
      })
      .when('/about', {
        controller:'TodoListController as todoList',
        templateUrl:'template/about.html'
      })
      .when('/edit', {
        controller:'TodoListController as todoList',
        templateUrl:'template/edit.html'
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

  });