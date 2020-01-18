import moment from 'moment';

export const userMessage = (value, username) => {
	return {
		user: username,
		message: value,
		timestamp: moment()
	};
};

export const adminMessageJoined = response => {
	return {
		user: 'admin',
		message: `${response} has joined the chat`,
		timestamp: moment()
	};
};

export const adminMessageLeft = user => {
	return {
		user: 'admin',
		message: `${user} has left the chat`,
		timestamp: moment()
	};
};
