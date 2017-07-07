var globalMenuItems = ['home', 'about', 'dashboard', 'overview', 'archive'];
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
      .when('/todo/:name', {
        controller: 'todoControls',
        templateUrl: 'template/todo.html'
      })
      .when('/create', {
        controller: 'todoControls',
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

    // DONE : Update active menu tab on routeChange
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      menu.activeRoot = current.$$route.originalPath
      Object.keys(menu.items).forEach(item => {
        menu.items[item]['isActive'] = (menu.items[item]['url'].indexOf(menu.activeRoot) > -1) ? true : false;
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
  .controller('dashboardControls', function($scope) {
    $scope.heading = 'Welcome';
  })
  .controller('overviewControls', function($scope) {
    $scope.heading = 'Welcome';
  })
  .controller('archiveControls', function() {
    let todoList = this;
    todoList.todos = [
      {
        id: 123,
        user: 'MrAppleBottom',
        title: 'title goes here',
        description:'whoop whoop',
        date: '12/05/89'
    }];
  })

  // REDO, make this fit into firebase
  .controller('todoListControls', function() {
    let todoList = this;
    todoList.todos = [
      {
        id: 123,
        user: 'MrAppleBottom',
        title: 'title goes here',
        description:'whoop whoop',
        status: 'waiting',
        comments: 5,
        urgency: 'on hold'
      }];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      let count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.status === 'done' ? 0 : 1;
      });
      return count;
    };
  })

  // REDO, make this fit into firebase
  .controller('todoControls', function($scope) {
    $scope.todo = {
      id: 123,
      user: 'MrAppleBottom',
      title: 'title goes here',
      description:'whoop whoop',
      status: 'waiting',
      comments: 5,
      urgency: 'on hold'
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

  console.log('obj >>', routeObj);
  return routeObj;
}