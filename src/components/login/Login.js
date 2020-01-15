import React, { useState } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setErrorMessage } from '../../redux/actions/login';

export const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const { username } = useSelector(state => state.loginReducer);
	const { error } = useSelector(state => state.loginReducer);
	const dispatch = useDispatch();

	const fullRegEx = /^([a-zåäö]{1})(\S{2,19})$/i;
	const doesntStartWithLetter = /^([^a-zåäö]{1})/i;
	const noSpacesAllowed = /\s/;

	const handleSubmit = e => {
		e.preventDefault();
		switch (true) {
			case doesntStartWithLetter.test(username):
				return dispatch(setErrorMessage('must begin with letter'));
			case noSpacesAllowed.test(username):
				return dispatch(setErrorMessage('may not contain spaces'));
			case username.length < 3:
				return dispatch(setErrorMessage('must be at least 3 characters'));
			case username.length > 20:
				return dispatch(setErrorMessage('cannot exceed 20 characters'));
			case fullRegEx.test(username):
				return setIsLoggedIn(true);
			default:
				return dispatch(setErrorMessage('please try a different nickname'));
		}
	};

	const handleUsername = e => {
		const event = e.target.value;
		dispatch(setErrorMessage(''));
		return dispatch(setUsername(event));
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
