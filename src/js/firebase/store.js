
class Store {

	constructor() {
		this.userID 	= window.sessionStorage.userID ? window.sessionStorage.userID : '';
		this.user 		= window.sessionStorage.user ? JSON.parse(window.sessionStorage.user) : {};
	    this.tasks 		= window.sessionStorage.tasks ? JSON.parse(window.sessionStorage.tasks) : [];

	    console.log('tasks from store >>>', this.users);
	}
}

module.exports = new Store();