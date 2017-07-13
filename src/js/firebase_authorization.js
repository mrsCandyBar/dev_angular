
class Authorize {

	signIn(auth, email, password) {
		let signInStatus = new Promise((resolve, reject) => {
			auth.signInWithEmailAndPassword(email, password).then((response) => { 
				console.log('passed >> true', response);
				resolve('sign in >>> passed', response);

			}, (error) => {
				console.log('failed >>', error);
				let errorCode = error.code;
				let errorMessage = error.message;
				reject('sign in >>> failed', errorCode, errorMessage)
			});
		});

		return signInStatus;
	}
	//passed > checkAuthState();

	signOut(auth) { 
		let signOutStatus = new Promise((resolve, reject) => {
			auth.signOut().then(function() { 
				resolve('sign out >>> passed');

			}).catch(function(error) {
				reject('sign out >>> failed', error);
			});
		});

		return signOutStatus;
	};

	state(auth) {
		let authState = new Promise((resolve, reject) => {
			auth.onAuthStateChanged(function(user) {
				if (user) {
					resolve('auth state >>> signed in', user);
					
				} else {
					reject('auth state >>> signed out', user);
				}
			});
		});

		return authState;
	};
	//checkAuthState >> listenToDB();

	reAuthenticate(user, credential) {
		let reAuthStatus = new Promise((resolve, reject) => {
			if (user) {
				user.reauthenticate(credential).then(function() {
					resolve('reauthenticate >>> passed');

				}, function(error) {
					reject('reauthenticate >>> failed');
				});
			}
			reject('reauthenticate >>> failed');
		});

		return reAuthStatus;
	}
}

module.exports = new Authorize();