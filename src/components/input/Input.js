import React from 'react';
import './Input.css';
import { g1ttuseDispatch } from 'react-redux';
import { appendMessage } from '../../redux/actions/message';

export const Input = () => {
	const dispatch = useDispatch();

	const handleSubmit = e => dispatch(appendMessage(e));

	const submitWithEnter = e => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			handleSubmit(e.target.value);
			e.target.value = '';
		}
	};

	return (
		<div className="Input" onSubmit={handleSubmit}>
			<form className="message-form">
				<textarea onKeyDown={submitWithEnter} />
				<button type="submit">
					<img
						src="https://img.icons8.com/ios-glyphs/30/000000/filled-sent.png"
						alt="send-button"
					/>
				</button>
			</form>
		</div>
	);
};
