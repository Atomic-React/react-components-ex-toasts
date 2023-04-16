import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import './Clock.css';

let timerId;

const Clock = ({ onSaveTime }) => {

	const [ time, setTime ] = useState(0);
	const [ isTimerPaused, setIsTimerPaused ] = useState(false);

	useEffect(() => {
		// componentDidMount
		// componentDidUpdate
		if (!isTimerPaused) { // isTimerPaused === false
			timerId = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		}

		return () => { // componentWillUnmount
			clearInterval(timerId);
		};

	}, [ isTimerPaused ]); // dependency array

	const handlePauseTimer = () => {
		setIsTimerPaused(true);
		clearInterval(timerId);
	};

	const handleResumeTimer = () => {
		setIsTimerPaused(false);
	};

	const handleStopTimer = () => {
		onSaveTime(time);
	};

	return (
		<div className="clock-container">
			<div className="clock-block">
				<p className="clock-text">{ time }</p>
				<div className="clock-actions">
					{ !isTimerPaused && <Button.Warning onClick={ handlePauseTimer }>Pause</Button.Warning> }
					{ isTimerPaused && <Button.Success onClick={ handleResumeTimer }>Resume</Button.Success> }
					<Button.Danger onClick={ handleStopTimer }>Stop</Button.Danger>
				</div>
			</div>
		</div>
	);
};

export default Clock;