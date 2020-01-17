const initState = {
	messages: [],
};

export const messageReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'APPEND_SENT_MESSAGE':
			return {
				...state,
				messages: [...state.messages, payload]
			};
		default:
			return state;
	}
};
