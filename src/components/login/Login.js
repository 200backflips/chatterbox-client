import React, { useState, useEffect } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setErrorMessage } from '../../redux/actions/login';
import io from 'socket.io-client';

export const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState();

	const { error } = useSelector(state => state.loginReducer);
	const { username } = useSelector(state => state.loginReducer);
	const dispatch = useDispatch();

	const socket = io('localhost:8080');

	useEffect(() => {
		socket.on('validateUsername', response => {
			if (!response.error) {
				dispatch(setUsername(response.username));
				setIsLoggedIn(!isLoggedIn);
			}
			dispatch(setErrorMessage(response.error));
		});
		return () => {
			socket.emit('join', username);
			socket.off('sendUsername');
			socket.off('validateUsername');
		};
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (user !== undefined) {
			console.log(user)
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
				<button type="submit">LOG IN</button>
			</form>
		</div>
	);
};
