
class Store {

	constructor() {
		this.isSignedIn = window.sessionStorage.password && window.sessionStorage.email ? true : false;
		this.isAdmin = false;
	}
}

module.exports = new Store();