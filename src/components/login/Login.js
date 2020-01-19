import React, { useState, useEffect } from 'react';
import './Login.css';
import './LoginDarkMode.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	setUsername,
	setErrorMessage,
	toggleLogIn
} from '../../redux/actions/login';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import io from 'socket.io-client';

export const Login = () => {
	const [user, setUser] = useState();

	const { error } = useSelector(state => state.loginReducer);
	const { isLoggedIn } = useSelector(state => state.loginReducer);
	const { darkMode } = useSelector(state => state.darkModeReducer);
	const dispatch = useDispatch();

	const socket = io('localhost:8080');

	useEffect(() => {
		socket.on('validateUsername', response => {
			if (!response.error) {
				dispatch(setUsername(response.username));
				dispatch(toggleLogIn(true));
				socket.emit('join', response.username);
			}
			dispatch(setErrorMessage(response.error));
		});
		return () => {
			socket.off('sendUsername');
			socket.off('validateUsername');
		};
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (user !== undefined) {
			return socket.emit('sendUsername', user);
		}
	};

	const handleUsername = e => {
		const event = e.target.value;
		dispatch(setErrorMessage(''));
		return setUser(event);
	};

	const toggleStyle = () => {
		dispatch(toggleDarkMode(!darkMode));
	};

	return isLoggedIn ? (
		<Redirect to="/chat" />
	) : (
		<div className={`Login${darkMode ? 'DarkMode' : ''}`}>
			<h1>chatter box</h1>
			<p>enter your nickname below</p>
			<form className={`login-form${darkMode ? 'DarkMode' : ''}`} onSubmit={handleSubmit}>
				<input type="text" onChange={handleUsername} />
				<span className={error && 'error-msg'}>{error}</span>
				<button type="submit">CONNECT</button>
			</form>
			<label className="switch">
				<input type="checkbox" onClick={toggleStyle} />
				<span className="slider round"></span>
			</label>
		</div>
	);
};
