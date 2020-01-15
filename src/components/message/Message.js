import React from 'react';
import './Message.css';

export const Message = ({ content }) => {
	return (
		<div className="Message">
			<div className="bubble">
				<p>{content}</p>
			</div>
		</div>
	);
};
