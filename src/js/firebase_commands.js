
class Command {
	
	addUser(database, userId, username, email) {
		database.ref('users/' + userId).set({
			username,
			email
		});
	}
	// addUser('ABC123','andy','andyb@gmail.com');

	updateUser(database, userId, username, email) {
		database.ref('users/' + userId).update({
			username,
			email
		});
	}
	// updateUser('ABC123','candy','candy@gmail.com');

	removeUser(database, userId) {
		database.ref('users/' + userId).remove();
	}
	// removeUser("ABC123")
}

module.exports = new Command();