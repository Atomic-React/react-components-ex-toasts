import './Toast.css';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { BiXCircle, BiBell } from 'react-icons/bi';
import { func, number, oneOf, string } from 'prop-types';

let timeoutId;
let intervalId;

const Toast = ({ title, message, variant, delay, onClose: handleClose }) => {

	// We initialize the state of the countdown
	// We need to display the time in seconds but the delay is in milliseconds, so we need to devide by 1000
	const [ time, setTime ] = useState(delay / 1000);

	// A function to start the countdown
	const startCountdown = () => {
		// We store the interval to clear it when the component is about to be unmounted
		intervalId = setInterval(() => {
			setTime(prevTime => {
				if (prevTime > 0) {
					return prevTime - 1;
				}
				return prevTime;
			});
		}, 1000);
	};

	useEffect(() => {
		// When the component is mounted, we start the count down
		startCountdown();
		// We store the timeout to clear it when the component is about to be unmounted
		timeoutId = setTimeout(() => {
			// When the time is out, we close the toast notification
			handleClose();
		}, delay);

		// When the component is about to be unmounted, we clear all timers
		() => {
			clearTimeout(timeoutId);
			clearInterval(intervalId);
		};
	}, []);

	return (
		// We need a portal here to display the toast at the top level of our application
		createPortal(
			<div className={`toast toast--${variant}`}>
				<div className="toast-icon">
					<BiBell />
				</div>
				<div className="toast-content">
					<h5>{ title }</h5>
					<p>{ message }</p>
				</div>
				<div role="button" onClick={ handleClose } className="toast-close">
					<BiXCircle />
					<small>{ time }</small>
				</div>
			</div>,
			document.body
		)
	);
};

export default Toast;

// Prop types validation

Toast.propTypes = {
	title: string.isRequired,
	message: string,
	variant: oneOf(['primary', 'warning', 'danger', 'success']),
	delay: number,
	onClose: func,
};

Toast.defaultProps = {
	message: '',
	variant: 'primary',
	delay: 3000,
	onClose: () => {},
};