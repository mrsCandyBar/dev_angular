
import Authorize from './firebase_authorization.js';
import User from './firebase_user.js';
import Query from './firebase_queries.js';
import Command from './firebase_commands.js';

class Firebase {
	
	constructor() {
    this.userID;
		this.user;
    this.tasks;
    this.firebase = initDB();
		this.database = this.firebase.database();
		this.credential;
    this.auth = this.firebase.auth();
	}

  createUser(userData) {
    let createUser = new Promise((resolve, reject) => {

      User.create(userData).then((data) => {
        Command.addUser(this.database, data.uid, userData);

        this.logUserIn(userData).then((response) => {
          resolve(response);
        }, (error) => {
          reject('user created but signin failed >>', error);
        });
        
      }, (error) => {
        reject('Oops something went wrong with your account creation', error);
      });

    });

    return createUser;
  }

	logUserIn(userData) {
    let loginUser = new Promise((resolve, reject) => {

      Authorize.signIn(this.auth, userData).then((data) => {
        this.userID = firebase.auth().currentUser.uid;
        this.credential = data;
        resolve('User logged in successfully');

      }, (error) => {
        reject('Sign in attempt failed >>', error);
      });
    });

    return loginUser;
	}

  setupOverviewPage() {
    let setupStatus = new Promise((resolve, reject) => {

      this._retrieveUserInfo().then((userData) => {
        this.user = userData;

        let task = {
            filter: 'user', 
            value: this.userID
          }

        if (!userData.admin) {
          task = {
            filter: 'organisation', 
            value: this.user.organisation
          }
        }

        this._retrieveTasks(task.filter, task.value).then((tasks) => {
          this.tasks = tasks;
          resolve('Page setup complete');
          
        }, (error) => {
          reject('User data found but no tasks');

        });

      }, (error) => {
        reject('User not found');
      });

    });

    return setupStatus;
  }

  _retrieveUserInfo() {
    let dataRetrieved = new Promise((resolve, reject) => {

      Query.data(this.database, 'users/' + this.userID).then((userData) =>{
        this.user = userData;
        resolve(userData);

      }, (error) => {
        reject('problem fetching user data', error)
      });
    });

    return dataRetrieved
  }

  _retrieveTasks(property, value) {
    let dataRetrieved = new Promise((resolve, reject) => {

      Query.dataAndsubscribeToUpdatesForSpecificResults(this.database, '/tasks', property, value).then((data) =>{
        resolve(data);

      }, (error) => {
        reject(error);
      });
    });

    return dataRetrieved
  }

		/*_isUserLoggedIn(user, credential) {
			Authorize.reAuthenticate(user, credential).then((resolve) => {
				this.user = firebase.auth().currentUser;
				this._returnUserData();

			}, (error) => { 
        console.log('user is not logged in', error)});
		}*/
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

module.exports = new Firebase();