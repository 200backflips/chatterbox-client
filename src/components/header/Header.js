import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export const Header = () => {

	return (
		<div className="Header">
			<Link to="/">
				<img
					src="https://img.icons8.com/wired/64/000000/exit-sign.png"
					alt="exit-button"
				/>
			</Link>
			<h2>chatter box</h2>
		</div>
	);
};
