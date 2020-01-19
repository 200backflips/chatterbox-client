import React, { useState } from 'react';
import './Input.css';
import './InputDarkMode.css';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { userMessage } from '../../messageTypes';

export const Input = () => {
	const { username } = useSelector(state => state.loginReducer);
	const { darkMode } = useSelector(state => state.darkModeReducer);
	const [message, setMessage] = useState('');

	const socket = io('localhost:8080');

	const handleSubmit = e => {
		e.preventDefault();
		socket.emit('sentMessages', userMessage(message, username));
		e.target.reset();
	};

	const handleMessage = e => {
		const event = e.target.value;
		if (e.target.value.length >= 1) {
			return setMessage(event);
		}
	};

	return (
		<div className={`Input${darkMode ? 'DarkMode' : ''}`}>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="write something" onChange={handleMessage} />
			</form>
		</div>
	);
};
