import React from 'react';
import './Message.css';

export const Message = ({ message }) => {
	console.log('*********', message)
	return (
		<div className="Message">
			<div className="bubble">
				<p>{message}</p>
			</div>
		</div>
	);
};
