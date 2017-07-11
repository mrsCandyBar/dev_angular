
class Data {
	constructor(rawObj) {
		this.example = [
		  {
		    id: 123,
		    user: 'MrAppleBottom',
		    title: 'Waiting Title goes here',
		    description:'whoop whoop',
		    status: 'waiting',
		    comments: 3,
		    urgency: 'on hold'
		  },
		  {
		    id: 456,
		    user: 'TallyLongSocks',
		    title: 'busy Clean the dishes',
		    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		    status: 'busy',
		    comments: 5,
		    urgency: 'urgent'
		  },
		  {
		    id: 123,
		    user: 'WillyWonka',
		    title: 'Waiting Title goes here',
		    description:'whoop whoop',
		    status: 'waiting',
		    comments: 1,
		    urgency: 'urgent'
		  },
		  {
		    id: 789,
		    user: 'JumpyJerry',
		    title: 'busy Download PS Plus games',
		    description:"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		    status: 'busy',
		    comments: 3,
		    urgency: 'on hold'
		  },
		  {
		    id: 123,
		    user: 'MrAppleBottom',
		    title: 'Waiting Title goes here',
		    description:'whoop whoop',
		    status: 'waiting',
		    comments: 1,
		    urgency: 'on hold'
		  }
		];
	}
}

module.exports = new Data();