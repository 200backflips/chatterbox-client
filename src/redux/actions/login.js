export const setUsername = username => {
	return {
		type: 'SET_USERNAME',
		payload: username
	};
};

export const setErrorMessage = error => {
	return {
		type: 'SET_ERROR_MESSAGE',
		payload: error
	};
};

export const toggleLogIn = isLoggedIn => {
	return {
		type: 'TOGGLE_LOG_IN',
		payload: isLoggedIn
	};
};
