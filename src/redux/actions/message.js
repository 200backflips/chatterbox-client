export const appendMessage = message => {
	return {
		type: 'APPEND_MESSAGE',
		payload: message
	};
};
