

// Initialize Firebase
      var config = {
        apiKey: "AIzaSyAHLGIuByAL6vrTfG7kbRtAwwf7kaCkt9k",
        authDomain: "starterproject-4e320.firebaseapp.com",
        databaseURL: "https://starterproject-4e320.firebaseio.com",
        projectId: "starterproject-4e320",
        storageBucket: "",
        messagingSenderId: "866187325341"
      };
      firebase.initializeApp(config);

      var database = firebase.database();
      

      // CRUD
      // WRITE TO DB
      function writeUserData(userId, username, email) {
        database.ref('users/' + userId).set({
          username,
          email
        });
      }

      // UPDATE DB
      function updateUserData(userId, username, email) {
        database.ref('users/' + userId).update({
          username,
          email
        });
      }

      // REMOVE FROM DB
      function removeUserData(userId) {
        database.ref('users/' + userId).remove();
      }

      // EG WRITE TO DB
      // writeUserData('ABC123','candice','candybar@gmail.com');

      // EG UPDATE DB
      // updateUserData('ABC123','candy','omw@gmail.com');

      // EG REMOVE FROM DB
      // removeUserData("ABC123")



      // LISTEN TO AUTHORIZATION STATE CHANGES
      function checkAuthState() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log('logged >>>', user);
            listenToDB();
            // ...
          } else {
            // User is signed out.
            // ...
            console.log('user is signed out >>>', user);
          }
        });
      };

      function listenToDB() {
        // RETRIEVE DB ONCE ONLY
        /*database.ref('/users').once('value').then(function(snapshot) {
          console.log('once >>>', snapshot.val());
        });*/

        // RESPOND TO UPDATES AND INITIAL DATA LOAD
        database.ref('/users').on('value', function(snapshot) {
          console.log('updated >>> listen to db', snapshot.val());
          }, function(err) {
          console.log('denied >>>', err);
        });
      }

      function stoplisteningToDB() {
        database.ref('/users').off('value', function(snapshot) {
          console.log('updated >>> not listening anymore', snapshot.val());
          //signOut();

          }, function(err) {
          console.log('denied >>>', err);
        });
      }


      // AUTHORIZE WITH EMAIL AND PASSWORD
      function promptSignIn(username, password) {
        firebase.auth().signInWithEmailAndPassword(username, password).then((response) => {
          console.log('passed >>>', response);
          checkAuthState();

        }, (error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('failed >>>', errorMessage);
          // ...
        });
      }

      function stopUpdatingAndSignOut() {
        console.log('stop updates and sign out >>>');
        // DEACTIVATE UPDATES TO DB
        database.ref('/users').off('value', function(snapshot) {
          console.log('updated >>> not listening anymore', snapshot.val());
          //signOut();

          }, function(err) {
          console.log('denied >>>', err);
        });
      }

      function signOut() { 
        firebase.auth().signOut().then(function() {
          console.log('sign out >>>');
          // Sign-out successful.
        }).catch(function(error) {
          console.log('can;t sign out >>>', error);
          // An error happened.
        });
      };

      // Prompt the user to re-provide their sign-in credentials
      // after something like a password change
      function checkCurrentUser(credential) {
        user.reauthenticate(credential).then(function() {
          console.log('woohoo!');
          // User re-authenticated.
        }, function(error) {
          console.log('oopsie!');
          // An error happened.
        });
      }

      var user = firebase.auth().currentUser;
      var credential;
      console.log('user >>', user);

      if (!user) {
        promptSignIn('candicekswartz@yahoo.com', 'logMeIn');
      } else {
        checkCurrentUser(credential);
      }


      // USER SPECIFIC DETAILS
  
      function updateUser(user, displayName, photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(function(data) {
           console.log('user data updated!', firebase.auth().currentUser);
          // Update successful.
        }, function(error) {
          console.log('user data update failed!');
          // An error happened.
        });
      }
      // updateUser(user, displayName, photoURL)

      function updatePassword(newPassword) {
          firebase.auth().currentUser.updatePassword(newPassword).then(function() {
          console.log('password updated!');
          // Update successful.
        }, function(error) {
          console.log('password failed!');
          // An error happened.
        });
      }
      // updatePassword('logMeIn');

      function resetEmail(email) {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          console.log('password email sent!');
          // Email sent.
        }, function(error) {
          console.log('password email failed!');
          // An error happened.
        });
      }
      // resetEmail('candicekswartz@yahoo.com')