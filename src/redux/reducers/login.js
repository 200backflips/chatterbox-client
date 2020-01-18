const initState = {
	username: '',
	error: '',
	isLoggedIn: false
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
		case 'TOGGLE_LOG_IN':
			return {
				...state,
				isLoggedIn: payload
			};
		default:
			return state;
	}
};
