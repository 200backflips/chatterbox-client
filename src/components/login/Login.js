import React, { useState } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	setUsername,
	setErrorMessage,
	isUsernameTaken
} from '../../redux/actions/login';
import io from 'socket.io-client';

export const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState();

	const socket = io('localhost:8080');

	const { error } = useSelector(state => state.loginReducer);
	const { isTaken } = useSelector(state => state.loginReducer);
	const dispatch = useDispatch();

	const fullRegEx = /^([a-zåäö]{1})(\S{2,19})$/i;
	const doesntStartWithLetter = /^([^a-zåäö]{1})/i;
	const noSpacesAllowed = /\s/;

	const handleSubmit = e => {
		e.preventDefault();

		switch (true) {
			case user === undefined:
				return dispatch(setErrorMessage('please enter a nickname'));
			case doesntStartWithLetter.test(user):
				return dispatch(setErrorMessage('must begin with letter'));
			case noSpacesAllowed.test(user):
				return dispatch(setErrorMessage('may not contain spaces'));
			case user.length < 3:
				return dispatch(setErrorMessage('must be at least 3 characters'));
			case user.length > 20:
				return dispatch(setErrorMessage('cannot exceed 20 characters'));
			case fullRegEx.test(user):
				return dispatch(setUsername(user)), setIsLoggedIn(true);
			default:
				return dispatch(setErrorMessage('please try a different nickname'));
		}
	};

	const handleUsername = e => {
		const event = e.target.value;
		dispatch(setErrorMessage(''));
		//cannot be on onChange
		socket.emit('getUsername', event);
		socket.on('validateUsername', response => {
			dispatch(isUsernameTaken(response));
		});
		if(isTaken) {
			return dispatch(setErrorMessage('username already taken'));
		}
		return setUser(event);
	};

	return isLoggedIn ? (
		<Redirect to="/chat" />
	) : (
		<div className="Login">
			<h1>chatter box</h1>
			<p>enter your nickname below</p>
			<form className="login-form" onSubmit={handleSubmit}>
				<input type="text" onChange={handleUsername} />
				<span className={error && 'error-msg'}>{error}</span>
				<button type="submit">LOG IN</button>
			</form>
		</div>
	);
};
