const initState = {
	messages: [],
	adminMessages: []
};

export const messageReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'APPEND_SENT_MESSAGE':
			return {
				...state,
				messages: [...state.messages, payload]
			};
		case 'APPEND_ADMIN_MESSAGE':
			return {
				...state,
				adminMessages: [...state.adminMessages, payload]
			};
		default:
			return state;
	}
};
