const initState = {
	darkMode: false
};

export const darkModeReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'TOGGLE_DARK_MODE':
			return {
				...state,
				darkMode: payload
			};
		default:
			return state;
	}
};
