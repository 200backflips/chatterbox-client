export const appendMessage = message => {
	return {
		type: 'APPEND_SENT_MESSAGE',
		payload: message
	};
};