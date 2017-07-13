
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

	removeUser(database, userId) {
		database.ref('users/' + userId).remove();
	}

	updateTask(database, taskId, taskData) {
		console.log('updated >>>', database, taskId, taskData);
		database.ref('tasks/' + taskId).update({
			id: taskData.id,
			user: taskData.user,
			username: taskData.username,
			title: taskData.title,
			description: taskData.description,
			organisation: taskData.organisation,
			status: taskData.status,
			comments: taskData.comments,
			urgency: taskData.urgency
		});
	}
}

module.exports = new Command();