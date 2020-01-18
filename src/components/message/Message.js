import React from 'react';
import './Message.css';

export const Message = ({ content, styling }) => {
	// const parseTimestamp = input => {
	// 	const regex1 = /[\d.:-]+/gi;
	// 	const regex2 = /[\w:]+/gi;
	// 	let splitDate = input.match(regex1)
	// 	return `${splitDate[0]} ${splitDate[1].match(regex2)[0]}`;
	// };

	return (
		<div className="Message">
			<p className={`user${styling}`}>{content.user}</p>
			<div className={`speech-bubble${styling}`}>
				<p>{content.message}</p>
			</div>
			{/* <span className="timestamp">{parseTimestamp(content.timestamp)}</span> */}
		</div>
	);
};
