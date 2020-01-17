import React, { useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Feed.css';
import { Message } from '../message/Message';
import io from 'socket.io-client';
import { appendMessage } from '../../redux/actions/message';
import moment from 'moment';

export const Feed = () => {
	const { username } = useSelector(state => state.loginReducer);
	const { messages } = useSelector(state => state.messageReducer);
	const dispatch = useDispatch();
	const feedRef = createRef();

	useEffect(() => {
		if (feedRef.current) {
			feedRef.current.scrollTop = feedRef.current.scrollHeight;
		}
	}, [feedRef]);

	useEffect(() => {
		const socket = io('localhost:8080');

		socket.on('join', response => {
			console.log(response);
			dispatch(
				appendMessage({
					user: 'admin',
					message: `${response} has joined the chat`,
					timestamp: moment()
				})
			);
		});

		socket.on('receivedMessages', response => {
			dispatch(appendMessage(response));
		});

		return () => {
			socket.off('receivedMessages');
			socket.off('join');
			socket.off('disconnect');
			dispatch(
				appendMessage({
					user: 'admin',
					message: `${username} has left the chat`,
					timestamp: moment()
				})
			);
		};
	}, []);

	const assignClassName = (content, username) => {
		if (content === username) {
			return '-right';
		} else if (content === 'admin') {
			return '-admin';
		}
		return '-left';
	};

	return (
		<div className="Feed" ref={feedRef}>
			{messages.map((content, i) => (
				<Message
					content={content}
					styling={assignClassName(content.user, username)}
					key={i}
				/>
			))}
		</div>
	);
};
