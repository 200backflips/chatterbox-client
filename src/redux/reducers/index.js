import { combineReducers } from 'redux';
import { loginReducer } from '../reducers/login';
import { messageReducer } from '../reducers/message';
import { darkModeReducer } from '../reducers/darkMode';

export const rootReducer = combineReducers({
	loginReducer,
	messageReducer,
	darkModeReducer
});
