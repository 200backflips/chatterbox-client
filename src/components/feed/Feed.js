import React, { useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Feed.css';
import './FeedDarkMode.css';
import { Message } from '../message/Message';
import io from 'socket.io-client';
import { appendMessage } from '../../redux/actions/message';
import { adminMessageJoined, adminMessageLeft } from '../../messageTypes';

export const Feed = () => {
	const { username } = useSelector(state => state.loginReducer);
	const { messages } = useSelector(state => state.messageReducer);
	const { darkMode } = useSelector(state => state.darkModeReducer);
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
			dispatch(appendMessage(adminMessageJoined(response)));
		});
		socket.on('receivedMessages', response => {
			dispatch(appendMessage(response));
		});
		socket.on('userLeft', user => {
			dispatch(appendMessage(adminMessageLeft(user)));
		});

		return () => {
			socket.off('receivedMessages');
			socket.off('join');
			socket.off('userLeft');
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
		<div className={`Feed${darkMode ? 'DarkMode' : ''}`} ref={feedRef}>
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
