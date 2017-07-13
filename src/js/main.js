import Firebase from './firebase.js';
import Menu from './controller_menuControls.js';
import StaticPage from './controller_staticControls.js';
import TodoControls from './controller_todoControls.js';
import Beer from './controller_beerControls.js';


// Set single menu items
// differentiate between string and obj for dropdown items {page: 'about', list: []}
var menuItems = Menu.buildMenu(['home', 'about', 'overview', 'archive']);

angular.module('myApp', ['ngRoute', 'tabsComponent'])

  .config(function($routeProvider) { 
    Menu.setRoutesWithBuiltMenu($routeProvider, menuItems); 

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
  .controller('menuControls',     function($rootScope)  { Menu.initMenu(this, $rootScope, menuItems) })
  .controller('homeControls',     function($scope, $location, $route)      { StaticPage.home($scope, $location, $route) })
  .controller('aboutControls',    function($scope)      { StaticPage.about($scope) })
  .controller('overviewControls', function($scope)      { StaticPage.overview($scope) })
  .controller('archiveControls',  function($scope)      { StaticPage.overview($scope) })

  .controller('todoListControls', function($route)      { TodoControls.retrieveTodos(this, $route) })
  .controller('todoControls',     function($scope)      { TodoControls.retrieveSingleTodo($scope) })
  .controller('createControls',   function($scope)      { TodoControls.createTodo($scope) });

/*
  // replace this with some fun stats based on user data returned
  .controller('beersControls',    function($scope, $locale) { Beer.initTabs($scope, $locale)
  })*/