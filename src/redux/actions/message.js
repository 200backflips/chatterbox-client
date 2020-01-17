export const appendMessage = message => {
	return {
		type: 'APPEND_SENT_MESSAGE',
		payload: message
	};
};

export const appendAdminMessage = message => {
	return {
		type: 'APPEND_ADMIN_MESSAGE',
		payload: message
	};
};
