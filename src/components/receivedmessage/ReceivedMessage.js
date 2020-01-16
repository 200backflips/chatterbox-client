import React from 'react';
import './ReceivedMessage.css';

export const ReceivedMessage = ({ content }) => {
	return (
			<div className="speech-bubble-left">
				<p>{content}</p>
			</div>
	);
};
