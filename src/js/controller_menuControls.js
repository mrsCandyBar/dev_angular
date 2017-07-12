
class Menu {

	buildMenu(globalMenuItems) {
		return _createRouteObj(globalMenuItems);
	}

	setRoutesWithBuiltMenu($routeProvider, globalMenuItems) {
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
	}


	initMenu($scope, $rootScope, globalMenuItems) {
		let menu = $scope;
		menu.items = globalMenuItems;

		$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
			menu.activeRoot = current.$$route.templateUrl;
			Object.keys(menu.items).forEach(item => {
				menu.items[item]['isActive'] = (menu.activeRoot.indexOf(menu.items[item]['page']) > -1) ? true : false;
			});
		});
	}
};

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

module.exports = new Menu();