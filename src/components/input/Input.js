import React from 'react';
import './Input.css';
import { useDispatch } from 'react-redux';
import { appendSentMessage } from '../../redux/actions/message';
import io from 'socket.io-client';

export const Input = () => {
	const dispatch = useDispatch();
	const socket = io('localhost:8080');

	const handleSubmit = message => {
		socket.emit('sentMessages', message);
		dispatch(appendSentMessage(message));
	}

	const submitWithEnter = e => {
		if (e.keyCode === 13 && e.shiftKey === false && e.target.value.length > 1) {
			e.preventDefault();
			handleSubmit(e.target.value);
			e.target.value = '';
		}
	};

	return (
		<div className="Input" onSubmit={handleSubmit}>
			<form className="message-form">
				<textarea onKeyDown={submitWithEnter} />
				<button type="submit">
					<img
						src="https://img.icons8.com/ios-glyphs/30/000000/filled-sent.png"
						alt="send-button"
					/>
				</button>
			</form>
		</div>
	);
};
