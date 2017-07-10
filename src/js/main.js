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
        controller: 'todoControls',
        templateUrl: 'template/overview.html'
      })
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

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      menu.activeRoot = current.$$route.templateUrl;
      Object.keys(menu.items).forEach(item => {
        menu.items[item]['isActive'] = (menu.activeRoot.indexOf(menu.items[item]['page']) > -1) ? true : false;
      });
    });
  })

  // PAGES  
  // Make this a dashboard
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
  .controller('todoListControls', function($route) {

    let todoList = this;
    todoList.todos = [
      {
        id: 123,
        user: 'MrAppleBottom',
        title: 'Waiting Title goes here',
        description:'whoop whoop',
        status: 'waiting',
        comments: 1,
        urgency: 'on hold'
      },
      {
        id: 456,
        user: 'TallyLongSocks',
        title: 'busy Clean the dishes',
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        status: 'busy',
        comments: 5,
        urgency: 'urgent'
      },
      {
        id: 123,
        user: 'WillyWonka',
        title: 'Waiting Title goes here',
        description:'whoop whoop',
        status: 'waiting',
        comments: 1,
        urgency: 'urgent'
      },
      {
        id: 789,
        user: 'JumpyJerry',
        title: 'busy Download PS Plus games',
        description:"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        status: 'busy',
        comments: 3,
        urgency: 'on hold'
      },
      {
        id: 123,
        user: 'MrAppleBottom',
        title: 'Waiting Title goes here',
        description:'whoop whoop',
        status: 'waiting',
        comments: 1,
        urgency: 'on hold'
      },];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.done = function() {
      let count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.status === 'done' ? 1 : 0;
      });
      return count;
    };


    if ($route.current.params) {
      let filter = $route.current.params['filter'];
      let sortedList = [];

      if (filter != 'name') {
        for(let todo = 0; todo < todoList['todos'].length;) {
          let beforeFilterCheck = todoList['todos'].length;
          let sortFilter = todoList['todos'][todo][filter];

          for(let checkTodo = 0; checkTodo < todoList['todos'].length;) {
            if (todoList['todos'][checkTodo][filter] === sortFilter) {
              let filterMatch = todoList['todos'].splice(checkTodo, 1);
              sortedList.push(filterMatch[0]);
            } else {
              checkTodo++;
            }
          }
        }
        todoList.todos = sortedList;

      } else {
        let allNames = [];
        todoList['todos'].forEach((todo) => {
          allNames[allNames.length] = todo.title;
        });

        allNames.sort();
        let sortedList = [];
        todoList['todos'].forEach((todo) => {
          for(let name = 0; name < allNames.length; name++) {

            if (allNames[name], allNames[name] === todo.title) {
              sortedList[sortedList.length] = todo;
            }
          }
        });

        console.log('name >>', todoList['todos'], sortedList);
        todoList['todos'] = sortedList;

      }
    }
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