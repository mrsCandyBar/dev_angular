import ModelProto from './model-prototype.js';

class TodoModel extends ModelProto {

	constructor(rawObj) {
		super();
		this.user = '';
		this.title = '';
		this.description = '';
		this.status = '';
		this.comments = '';
		this.urgency = '';
		this.createModel(rawObj);
	}
}

module.exports = TodoModel;