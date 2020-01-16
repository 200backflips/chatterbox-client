import React from 'react';
import './SentMessage.css';

export const SentMessage = ({ content }) => {
	return (
		<div className="speech-bubble-right">
			<p>{content}</p>
		</div>
	);
};
