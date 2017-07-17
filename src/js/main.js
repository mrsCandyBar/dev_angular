import Firebase from './firebase.js';
import Menu from './controller_menuControls.js';
import Pages from './controller_pageControls.js';
import Beer from './controller_beerControls.js';
import AngularUUID from 'angular-uuid';


// Set single menu items
// differentiate between string and obj for dropdown items {page: 'about', list: []}
var menuItems = Menu.buildMenu(['home', 'about', 'overview', 'archive']);

angular.module('myApp', ['ngRoute', 'tabsComponent', 'angular-uuid'])

  .config(function($routeProvider) { 
    Menu.setRoutesWithBuiltMenu($routeProvider, menuItems); 

    // set custom urls
    $routeProvider
      .when('/overview/:filter', {
        controller: 'overviewControls',
        templateUrl: 'template/overview.html'
      })
      .when('/todo/:id', {
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
  .controller('menuControls',     function($rootScope)                      { Menu.initMenu(this, $rootScope, menuItems) })
  .controller('homeControls',     function($scope, $location, $route)       { Pages.home($scope, $location, $route) })
  .controller('aboutControls',    function($scope)                          { Pages.about($scope) })
  .controller('overviewControls', function($scope, $route)                  { Pages.overview($scope, $route) })
  .controller('archiveControls',  function($scope, $route)                  { Pages.archive($scope, $route) })
  .controller('todoControls',     function($scope, $route)                  { Pages.todo($scope, $route) })
  .controller('createControls',   function($scope, $route, uuid)     { 
    let getUUID = uuid.v4();
    Pages.create($scope, $route, getUUID) 
  })

/*
  // replace this with some fun stats based on user data returned
  .controller('beersControls',    function($scope, $locale) { Beer.initTabs($scope, $locale)
  })*/