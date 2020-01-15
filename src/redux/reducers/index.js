import { combineReducers } from 'redux';
import { loginReducer } from '../reducers/login';
import { messageReducer } from '../reducers/message';

export const rootReducer = combineReducers({
	loginReducer,
	messageReducer,
});
