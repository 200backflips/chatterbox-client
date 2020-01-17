import { isUsernameTaken } from '../actions/login';

const initState = {
	username: '',
	error: '',
	isTaken: false
};

export const loginReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: payload
			};
		case 'SET_ERROR_MESSAGE':
			return {
				...state,
				error: payload
			};
		case 'IS_USERNAME_TAKEN':
			return { isTaken: payload };
		default:
			return state;
	}
};
