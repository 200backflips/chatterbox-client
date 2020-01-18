import React, { useState, useEffect } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	setUsername,
	setErrorMessage,
	toggleLogIn
} from '../../redux/actions/login';
import io from 'socket.io-client';

export const Login = () => {
	const [user, setUser] = useState();

	const { error } = useSelector(state => state.loginReducer);
	const { isLoggedIn } = useSelector(state => state.loginReducer);
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

	return isLoggedIn ? (
		<Redirect to="/chat" />
	) : (
		<div className="Login">
			<h1>chatter box</h1>
			<p>enter your nickname below</p>
			<form className="login-form" onSubmit={handleSubmit}>
				<input type="text" onChange={handleUsername} />
				<span className={error && 'error-msg'}>{error}</span>
				<button type="submit">CONNECT</button>
			</form>
		</div>
	);
};
