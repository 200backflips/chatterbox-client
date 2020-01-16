import React, { useEffect } from 'react';
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
	const { sentMessages } = useSelector(state => state.messageReducer);
	const { receivedMessages } = useSelector(state => state.messageReducer);
	const { adminMessages } = useSelector(state => state.messageReducer);
	const dispatch = useDispatch();

	let socket;
	const ENDPOINT = 'localhost:8080';

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('join', username);
		socket.on('join', message => dispatch(appendAdminMessage(message)));
	}, [ENDPOINT, username]);

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.on('receivedMessages', message => {
			dispatch(appendReceivedMessage(message));
		});
	}, [ENDPOINT, receivedMessages]);

	return (
		<div className="Feed">
			<div className="content">
				{adminMessages.map((content, i) => (
					<AdminMessage content={content} key={i} />
				))}
				{receivedMessages.map((content, i) => (
					<ReceivedMessage content={content} key={i} />
				))}
				{sentMessages.map((content, i) => (
					<SentMessage content={content} key={i} />
				))}
			</div>
		</div>
	);
};
