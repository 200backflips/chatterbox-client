import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Feed.css';
import { SentMessage } from '../sentmessage/SentMessage';
import { ReceivedMessage } from '../receivedmessage/ReceivedMessage';
import { AdminMessage } from '../adminmessage/AdminMessage';
import io from 'socket.io-client';
import {
	appendAdminMessage,
	appendReceivedMessage
} from '../../redux/actions/message';

export const Feed = () => {
	const { username } = useSelector(state => state.loginReducer);
	const { adminMessages } = useSelector(state => state.messageReducer);
	const { sentMessages } = useSelector(state => state.messageReducer);
	const { receivedMessages } = useSelector(state => state.messageReducer);
	const dispatch = useDispatch();

	const [displayMessages, setDisplayMessages] = useState([]);

	let socket;
	const ENDPOINT = 'localhost:8080';

	const handleSentMessage = () => {
		setDisplayMessages(displayMessages => [
				...displayMessages,
				<SentMessage content={sentMessages[sentMessages.length - 1]} />
			]);
	};

	const handleReceivedMessage = () => {
		setDisplayMessages(displayMessages => [
			...displayMessages,
			<ReceivedMessage content={receivedMessages[receivedMessages.length - 1]} />
		]);
};

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('join', username);
		socket.on('join', message => dispatch(appendAdminMessage(message)));
	}, [ENDPOINT, username]);

	useEffect(() => {
		handleSentMessage();
	}, [sentMessages]);
	
	useEffect(() => {
		socket = io(ENDPOINT);

		socket.on('receivedMessages', message => {
			dispatch(appendReceivedMessage(message));
		});
		handleReceivedMessage();
	}, [sentMessages]);


	return (
		<div className="Feed">
			<div className="content">{displayMessages.length > 1 && displayMessages}</div>
		</div>
	);
};
