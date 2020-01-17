import React from 'react';
import './Message.css';

export const Message = ({ content, styling }) => {
	return (
		<div className="Message">
			<p className={`user${styling}`}>{content.user}</p>
			<div className={`speech-bubble${styling}`}>
				<p>{content.message}</p>
			</div>
		</div>
	);
};
