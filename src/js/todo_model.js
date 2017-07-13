import ModelProto from './model.js';

class TodoModel extends ModelProto {

	constructor(rawObj) {
		super();
		this.id = '';
		this.user = '';
		this.username = '';
		this.title = '';
		this.description = '';
		this.status = '';
		this.comments = '';
		this.urgency = '';
		this.createModel(rawObj);
	}
}

module.exports = TodoModel;