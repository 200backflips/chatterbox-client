import React from 'react';
import './ChatRoom.css';
import './ChatRoomDarkMode.css';
import { Header } from '../header/Header';
import { Feed } from '../feed/Feed';
import { Input } from '../input/Input';
import { useSelector } from 'react-redux';

export const ChatRoom = () => {
	const { darkMode } = useSelector(state => state.darkModeReducer);

	return (
		<div className={`ChatRoom${darkMode ? 'DarkMode' : ''}`}>
			<Header />
			<Feed />
			<Input />
		</div>
	);
};
