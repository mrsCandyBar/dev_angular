
import Authorize from './firebase_authorization.js';
import User from './firebase_user.js';
import Query from './firebase_queries.js';
import Command from './firebase_commands.js';

class Firebase {
	
	constructor() {
    this.userID;
		this.user;
    this.allUsers;
    this.tasks;
    this.firebase = initDB();
		this.database = this.firebase.database();
    this.auth = this.firebase.auth();
    
    if (window.sessionStorage.length > 0) {
      this.autoLogin();
    }
	}

  autoLogin() {
    let user = {
      email : window.sessionStorage.email,
      password : window.sessionStorage.password
    }

    this.logIn(user).then((response) => {
      console.log('auto login passed');
    }, (error) => {
      console.log('auto login failed >>>', error);
    });
  }

  create(user) {
    let createUser = new Promise((resolve, reject) => {
      User.create(user).then((data) => {
        Command.addUser(this.database, data.uid, user);

        this.logIn(user).then((response) => {
          resolve(response);
        }, (error) => {
          console.log('user created but signIn failed >>', error);
          reject(error);
        });
        
      }, (error) => {
        reject('Oops something went wrong with your account creation', error);
      });

    });

    return createUser;
  }

	logIn(user) {
    let logInUser = new Promise((resolve, reject) => {
      Authorize.signIn(this.auth, user).then((data) => {
        window.sessionStorage.email = user.email;
        window.sessionStorage.password = user.password;
        
        this.userID = firebase.auth().currentUser.uid;
        resolve('User logged in successfully');

      }, (error) => {
        reject('Sign in attempt failed >>', error);
      });
    });

    return logInUser;
	}

  logOut() {
    let logOutUser = new Promise((resolve, reject) => {
      Authorize.signOut(this.auth).then((data) => {
        window.sessionStorage.clear();
        this.userID = '';
        resolve('User logged out successfully');

      }, (error) => {
        reject('Sign out attempt failed >>', error);
      });
    });

    return logOutUser;
  }

  retrieveUserInfo() {
    let dataRetrieved = new Promise((resolve, reject) => {
      Query.data(this.database, 'users/' + this.userID).then((userData) =>{
        this.user = userData;
        this.searchFilters = _returnSearchFilters(userData.admin, userData.organisation, this.userID);
        resolve(userData);

      }, (error) => {
        reject('problem fetching user data', error)
      });
    });

    return dataRetrieved
  }

  retrieveTasks(activity) {
    let setupTasks = new Promise((resolve, reject) => {
      this._retrieveTasks(activity).then((tasks) => {
        this.tasks = tasks;
        resolve('Page setup complete');
        
      }, (error) => {
        reject('User data found but no tasks');

      });
    });

    return setupTasks;
  }

    _retrieveTasks(location) {
      let dataRetrieved = new Promise((resolve, reject) => {
        Query.dataAndsubscribeToUpdatesForSpecificResults(this.database, '/' + location, this.searchFilters.filter, this.searchFilters.value).then((data) =>{
          resolve(data);

        }, (error) => {
          reject(error);
        });
      });

      return dataRetrieved
    }

  taskUpdate(location) {
    let taskData = new Promise((resolve, reject) => {
      this._retrieveTasks(location).then((tasks) => {

        let updated = _hasListBeenUpdated(this.tasks, tasks);
        if (updated) {
          this.tasks = tasks;
          resolve('Tasks Updated');
        }
        reject('No changes to task data');

      }, (error) => {
        reject('User data found but no tasks');
      });
    })

    return taskData;
  }

  retrieveUsers() {
    let dataRetrieved = new Promise((resolve, reject) => {
      Query.data(this.database, 'users/').then((users) => {

        let userArray = [];
        if (users && users !== null && typeof users === 'object') {
          Object.keys(users).forEach((user) => {
            userArray[userArray.length] = users[user];
          });
        }

        let updated = _hasListBeenUpdated(this.allUsers, userArray);
        if (updated) {
          this.allUsers = userArray;
          resolve(this.allUsers);
        }
        reject('No changes to user data');

      }, (error) => {
        reject(error);
      });
    });

    return dataRetrieved;
  }

  updateTask(taskData) {
    Command.updateTask(this.database, taskData.id, taskData);
    this.tasks[taskData.id] = taskData;
  }

  moveTask(taskData, location) {
    Command.moveTask(this.database, taskData.id, taskData, location);
  }

  deleteTask(taskId) {
    Command.deleteTask(this.database, taskId, 'tasks');
  }
}

function initDB() {
  var config = {
  	apiKey: "AIzaSyAHLGIuByAL6vrTfG7kbRtAwwf7kaCkt9k",
    authDomain: "starterproject-4e320.firebaseapp.com",
    databaseURL: "https://starterproject-4e320.firebaseio.com",
    projectId: "starterproject-4e320",
    storageBucket: "",
    messagingSenderId: "866187325341"
  };

  firebase.initializeApp(config);
  return firebase;
}

function _returnSearchFilters(isAdmin, organisation, userId) {
  let task = {
      filter: !isAdmin ? 'organisation' : 'user', 
      value : !isAdmin ? organisation : userId
    }

  return task;
}

function _hasListBeenUpdated(listOld, listNew) {
  let currentList = angular.toJson(listOld);
  let newList = JSON.stringify(listNew);

  if (currentList !== newList) {
    return true;
  } else {
    return false;
  }
}

module.exports = new Firebase();