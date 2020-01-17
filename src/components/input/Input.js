import React from 'react';
import './Input.css';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessage } from '../../redux/actions/message';
import io from 'socket.io-client';
import moment from 'moment';

export const Input = () => {
	const { username } = useSelector(state => state.loginReducer);
	const dispatch = useDispatch();
	const socket = io('localhost:8080');

	const submitWithEnter = e => {
		if (e.keyCode === 13 && e.shiftKey === false && e.target.value.length > 1) {
			e.preventDefault();
			handleSubmit({
				user: username,
				message: e.target.value,
				timestamp: moment()
			});
			e.target.value = '';
		}
	};
	const handleSubmit = message => {
		socket.emit('sentMessages', message);
		dispatch(appendMessage(message));
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
