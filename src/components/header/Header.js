import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Header.css';
import { Redirect } from 'react-router-dom';
import { toggleLogIn } from '../../redux/actions/login';
import io from 'socket.io-client';

export const Header = () => {
	const { isLoggedIn } = useSelector(state => state.loginReducer);
	const { username } = useSelector(state => state.loginReducer);
	const dispatch = useDispatch();
	const socket = io('localhost:8080');

	const handleSignOut = () => {
		socket.emit('userLeft', username);
		dispatch(toggleLogIn(false));
	};

	return isLoggedIn ? (
		<div className="Header">
			<a onClick={handleSignOut}>
				<img
					src="https://img.icons8.com/wired/64/000000/exit-sign.png"
					alt="exit-button"
				/>
			</a>
			<h2>chatter box</h2>
		</div>
	) : (
		<Redirect to="/" />
	);
};
