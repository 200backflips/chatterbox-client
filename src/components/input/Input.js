import React from 'react';
import './Input.css';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import moment from 'moment';

export const Input = () => {
	const { username } = useSelector(state => state.loginReducer);
	const socket = io('localhost:8080');

	const submitWithEnter = e => {
		if (e.keyCode === 13 && e.shiftKey === false && e.target.value.length >= 1) {
			e.preventDefault();
			handleSubmit(e.target.value);
			e.target.value = '';
		}
	};
	const handleSubmit = value => {
		const message = {
			user: username,
			message: value,
			timestamp: moment()
		};
		socket.emit('sentMessages', message);
	};

	return (
		<div className="Input">
			<textarea onKeyDown={submitWithEnter} />
		</div>
	);
};
