import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Feed.css';
import { Message } from '../message/Message';
import { AdminMessage } from '../adminmessage/AdminMessage';
import io from 'socket.io-client';
import { appendAdminMessage, appendMessage } from '../../redux/actions/message';

export const Feed = () => {
	const { username } = useSelector(state => state.loginReducer);
	const { adminMessages } = useSelector(state => state.messageReducer);
	const { messages } = useSelector(state => state.messageReducer);
	const dispatch = useDispatch();

	let socket;
	const ENDPOINT = 'localhost:8080';

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('join', username);
		socket.on('join', message => dispatch(appendAdminMessage(message)));
		socket.on('receivedMessage', message => {
			console.log(message)
			return dispatch(appendMessage(message))
		});
	}, [ENDPOINT, username]);

	return (
		<div className="Feed">
			<div className="content">
				{messages.map((content, i) => (
					<Message
						content={content}
						styling={
							content.user === username
								? 'speech-bubble-right'
								: 'speech-bubble-left'
						}
					key={i}/>
				))}
			</div>
		</div>
	);
};
