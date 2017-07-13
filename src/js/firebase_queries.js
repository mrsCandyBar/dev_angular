
class Query {

	data(database, url) {
		let retrievedData = new Promise((resolve) => {
			database.ref(url).once('value').then(function(snapshot) {
				resolve('data >>> retrieved', snapshot.val());
			});
		});

		return retrievedData;
	}

	dataAndsubscribeToUpdates(database, url) {
		let data = new Promise((resolve, reject) => {
			database.ref(url).on('value', function(snapshot) {
				resolve('data >>> retrieved and subscribed', snapshot.val());

			}, function(err) {
				reject('data >>> denied retrieval and subscription', err);
			});
		});

		return data;
	}

	unsubscribeFromUpdates(database, url) {
		let data = new Promise((resolve, reject) => {
			database.ref(url).off('value', function(snapshot) {
				resolve('data >>> unsubscribed', snapshot.val());

			}, function(err) {
				reject('data >>> unsubscribe error', err);
			});	
		});

		return data;
	}
}

module.exports = new Query();