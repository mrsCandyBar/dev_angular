
class User {

	update(user, displayName, photoURL) {
		let updates = new Promise((resolve, reject) => {
			user.updateProfile({
				displayName,
				photoURL
			}).then(function(data) {
				resolve('user >>> updated', firebase.auth().currentUser);

			}, function(error) {
				reject('user >>> update failed', error);
			});
		});

		return updates;
	}

	changePassword(newPassword) {
		let passwordStatus = new Promise ((resolve, reject) => {
			firebase.auth().currentUser.updatePassword(newPassword).then(function() {
				resolve('user >>> password updated');

			}, function(error) {
				reject('user >>> password update failed', error);
			});
		});

		return passwordStatus;
	}


	changeEmailAddress(email) {
		let resetEmail = new Promise ((resolve, reject) => {
			firebase.auth().sendPasswordResetEmail(email).then(function() {
				resolve('user >>> password sent');

			}, function(error) {
				reject('user >>> password email failed', error);
			});
		});

		return resetEmail;
	}
}

module.exports = new User();