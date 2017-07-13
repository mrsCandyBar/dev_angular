
class Command {
	
	addUser(database, userId, userData) {
		database.ref('users/' + userId).set({
			id: userId,
			name: userData.name,
			email: userData.email,
			organisation: userData.organisation,
			admin: userData.admin,
			password: userData.password
		});
		console.log('user created');
	}

	updateUser(database, userId, userData) {
		database.ref('users/' + userId).update({
			id: userId,
			name: userData.name,
			email: userData.email,
			organisation: userData.organisation,
			admin: userData.admin
		});
	}
	// updateUser('ABC123','candy','candy@gmail.com');

	removeUser(database, userId) {
		database.ref('users/' + userId).remove();
	}
	// removeUser("ABC123")
}

module.exports = new Command();