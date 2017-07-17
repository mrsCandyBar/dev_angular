
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

	updateTask(database, taskId, taskData, newLocation) {
		let location = newLocation ? newLocation : 'tasks';
		database.ref(location + '/' + taskId).update({
			id: taskData.id,
			user: taskData.user,
			username: taskData.username,
			title: taskData.title,
			description: taskData.description,
			organisation: taskData.organisation,
			status: taskData.status,
			comments: taskData.comments,
			isActive: taskData.isActive,
			urgency: taskData.urgency
		});
	}

	deleteTask(database, taskId, newLocation) {
		let location = newLocation ? newLocation : 'tasks';
		database.ref(location + '/' + taskId).remove();
	}

	moveTask(database, taskId, taskData, newLocation) {
		let removeLocation = newLocation === 'archive' ? 'tasks' : 'archive';
		taskData.isActive = (newLocation === 'archive') ? false : true;
		console.log('task data >>>', taskData);
		this.updateTask(database, taskId, taskData, newLocation);
		this.deleteTask(database, taskId, removeLocation);
	}
}

module.exports = new Command();