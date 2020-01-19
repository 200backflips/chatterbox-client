import React from 'react';
import './Message.css';
import './MessageDarkMode.css';
import { useSelector } from 'react-redux';

export const Message = ({ content, styling }) => {
	const { darkMode } = useSelector(state => state.darkModeReducer);

	return (
		<div className="Message">
			<p className={`user${styling}${darkMode ? 'DarkMode' : ''}`}>
				{content.user}
			</p>
			<div className={`speech-bubble${styling}${darkMode ? 'DarkMode' : ''}`}>
				<p>{content.message}</p>
			</div>
		</div>
	);
};
