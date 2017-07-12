import TodoModel from './todo_model.js';

class TodoService {

	retrieveTodos(rawObj) {
	  if (rawObj && rawObj !== null && typeof rawObj === 'object') {
	    let buildMap = [];
	    rawObj.forEach((todoObj) => {
	      buildMap[buildMap.length] = new TodoModel(todoObj);
	    })
	    
	    return buildMap;
	  } 
	}

	retrieveSearchFilters() {
		return new TodoModel([]).getModelFilters();
	}

	filterResults(params, store) {
    if (params != 'title') {
      return _filterByProperty(params, store);
    } else {
     	return _filterByOrder(params, store);
    }
  } 

  retrieveSingleTodo(id) {
    return new TodoModel(id);
  }
}

function _filterByProperty(filter, store) {
	let sortedList = [];

  	for(let item = 0; item < store.length;) {
      let sortFilter = store[item][filter];

      	for(let todo = 0; todo < store.length;) {
            if (store[todo][filter] === sortFilter) {
              	let filterMatch = store.splice(todo, 1);
              	sortedList.push(filterMatch[0]);

            } else {
              	todo++;
            }
      	}
    }

    return _filterByOrder(filter, sortedList);
}

function _filterByOrder(param, store) {
  	let allNames = [];
    store.forEach((todo) => {
      	allNames[allNames.length] = todo[param];
    });

    allNames.sort();
    let sortedList = [];

    allNames.forEach((name) => {
    	
    	for (let item = 0; item < store.length; item++) {
			
			if (name === store[item][param]) {
				let storeItem = JSON.stringify(store[item]);
				store.splice(item, 1);
	          	sortedList[sortedList.length] = JSON.parse(storeItem);

	          	break;
	        }
    	};
    });
    return sortedList;
}

module.exports = new TodoService();