
import Authorize from './firebase_authorization.js';
import User from './firebase_user.js';
import Query from './firebase_queries.js';
import Command from './firebase_commands.js';

class Firebase {
	
	constructor() {
		this.user;
    this.firebase = initDB();
		this.database = this.firebase.database();
		this.credential;
    this.auth = this.firebase.auth();
	}

	logUserIn(account, userData) {
    let loginUser = new Promise((resolve, reject) => {
  		if (!account) { 
        //this._isUserLoggedIn();

      } else {
        let user = {
          email: 'candicekswartz@yahoo.com', //userData.email,
          password: 'logMeIn' //userData.password
        };

  			Authorize.signIn(this.auth, user.email, user.password).then((data) => {
          this.user = firebase.auth().currentUser;
  				this.credential = data;
  				resolve(this._returnUserData());

  			}, (error) => {
  				reject('Sign in attempt failed >>', error);
  			});
  		}
    });

    return loginUser;
	}

		_isUserLoggedIn(user, credential) {
			Authorize.reAuthenticate(user, credential).then((resolve) => {
				this.user = firebase.auth().currentUser;
				this._returnUserData();

			}, (error) => { 
        console.log('user is not logged in', error)});
		}

		_returnUserData() {
			/*Query.data(this.database, '/users').then((dataRetrieved) =>{
				// Do something with data once only;
			});*/

			Query.dataAndsubscribeToUpdates(this.database, '/users').then((data) =>{
				// Do something with data and subscribe to data updates;
			}, (error) => {
				alert('Error returning user data >>', error)
			});
		}


	/*bindUIEvents() {
		let className = _getButtonClasses();

		if (className.contains("addUser")) {
		  	Command.addUser(this.database, userId, username, email);
		}
		else if (className.contains("updateUser")) {
			Command.addUser(this.database, userId, username, email);
		}
		else if (className.contains("removeUser")) {
			Command.removeUser(this.database, userId);
		}
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