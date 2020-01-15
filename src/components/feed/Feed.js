import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Feed.css';
import { Message } from '../message/Message';
import io from 'socket.io-client';

let socket;

export const Feed = () => {
	const ENDPOINT = 'localhost:8080';
	const { username } = useSelector(state => state.loginReducer);
	const { messages } = useSelector(state => state.messageReducer);

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('message', `${username} is dumb. yes.`);

		// socket.on('join', message => {
		// 	return join.push(message);
		// });

		return () => {
			socket.emit('disconnect', username);
			socket.off();
		};
	}, [ENDPOINT, username]);

	return (
		<div className="Feed">
			{messages.map((content, i) => (
				<Message content={content} key={i} />
			))}
		</div>
	);
};