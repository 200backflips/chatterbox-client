import React from 'react';
import './Message.css';

export const Message = ({ content, styling }) => {
	return (
		<div className={styling}>
			<p>{content.user}</p>
			<p>{content.message}</p>
		</div>
	);
};
