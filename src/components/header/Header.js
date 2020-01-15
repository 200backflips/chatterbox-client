import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
	const { username } = useSelector(state => state.loginReducer);

	return (
		<div className="Header">
			<h2>elloooooo {username}</h2>
			<Link to="/">back</Link>
		</div>
	);
};
