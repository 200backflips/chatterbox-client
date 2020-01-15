const initState = {
	username: '',
	error: ''
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
		default:
			return state;
	}
};
