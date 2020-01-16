import React from 'react';
import './AdminMessage.css';

export const AdminMessage = ({ content }) => {
	return (
		<div className="speech-bubble-admin">
			<p>{content}</p>
		</div>
	);
};
