import React from 'react';
import './ChatRoom.css';
import { Header } from '../header/Header';
import { Feed } from '../feed/Feed';
import { Input } from '../input/Input';

export const ChatRoom = () => {
	return (
		<div className="ChatRoom">
			<Header />
			<Feed />
			<Input />
		</div>
	);
};
