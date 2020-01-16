const initState = {
	sentMessages:[],
	receivedMessages:[],
	adminMessages:[],
};

export const messageReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'APPEND_SENT_MESSAGE':
			return {
				...state,
				sentMessages: [...state.sentMessages, payload]
			};
			case 'APPEND_RECEIVED_MESSAGE':
				return {
					...state,
					receivedMessages: [...state.receivedMessages, payload]
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
