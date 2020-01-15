import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Feed.css';
import { Message } from '../message/Message';
import io from 'socket.io-client';

let socket;

export const Feed = () => {
	const ENDPOINT = 'localhost:8080';
	const { username } = useSelector(state => state.loginReducer);
	const join = [];

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('message', `${username} is dumb. yes.`);

		socket.on('join', message => {
			return join.push(message);
		});

		return () => {
			socket.emit('disconnect', username);
			socket.off();
		};
	}, [ENDPOINT]);

	// const messageArray = [
	// 	'hello!',
	// 	'hello',
	// 	'follow me',
	// 	'ok!',
	// 	'blablablabla bla bla bla bla long message',
	// 	'blablablabla bla bla also long message'
	// ];

	return (
		<div className="Feed">
			{join.map((msgs, i) => (
				<Message message={msgs} key={i} />
			))}
		</div>
	);
};

// <div className="Feed">
// 	{messageArray.map((msgs, i) => (
// 		<Message message={msgs} key={i} />
// 	))}
// </div>
