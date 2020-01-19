import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Header.css';
import './HeaderDarkMode.css';
import { Redirect } from 'react-router-dom';
import { toggleLogIn } from '../../redux/actions/login';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import io from 'socket.io-client';

export const Header = () => {
	const { isLoggedIn } = useSelector(state => state.loginReducer);
	const { username } = useSelector(state => state.loginReducer);
	const { darkMode } = useSelector(state => state.darkModeReducer);
	const dispatch = useDispatch();
	const socket = io('localhost:8080');

	const handleSignOut = () => {
		socket.emit('userLeft', username);
		dispatch(toggleLogIn(false));
	};

	const toggleStyle = () => {
		dispatch(toggleDarkMode(!darkMode));
	};

	return isLoggedIn ? (
		<div className={`Header${darkMode ? 'DarkMode' : ''}`}>
			<a onClick={handleSignOut}>
				<img
					src="https://img.icons8.com/ios/96/000000/xbox-x.png"
					alt="exit-button"
				/>
			</a>
			<h2>chatter box</h2>
			<label className="switch">
				<input type="checkbox" onClick={toggleStyle} />
				<span className="slider round"></span>
			</label>
		</div>
	) : (
		<Redirect to="/" />
	);
};
