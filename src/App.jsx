import Header from './components/layout/Header';
import { BiTimer } from 'react-icons/bi';
import Button from './components/ui/Button';
import Clock from './components/features/Clock';
import './App.css';
import { useState } from 'react';
import Times from './components/features/Times';
import withFilteredTimes from './components/features/Times/withFilteredTimes';

const NotDeletedTimes = withFilteredTimes(Times, ({ times }) => times.filter(({ isDeleted }) => !isDeleted));
const DeletedTimes = withFilteredTimes(Times, (props) => props.times.filter(({ isDeleted }) => isDeleted));

function App() {

	const [ isClockDisplayed, setIsClockDisplayed ] = useState(false);
	const [ times, setTimes ] = useState([]);

	const handleClick = () => {
		setIsClockDisplayed(!isClockDisplayed);
	};

	const handleSaveTime = (time) => {
		setTimes([...times, { id: Date.now(), time, createdOn: new Date(), isDeleted: false }]);
		setIsClockDisplayed(false);
	};

	const handleRemoveTime = (timeId) => () => {
		setTimes((prevTimes) => prevTimes.map(time => {
			if (time.id === timeId) {
				time.isDeleted = true;
			}
			return time;
		}));
	};
	
	const handleRestoreTime = (timeId) => () => {
		setTimes((prevTimes) => prevTimes.map(time => {
			if (time.id === timeId) {
				time.isDeleted = false;
			}
			return time;
		}));
	};

	return (
		<>
			<Header brandIcon={<BiTimer />} brandName="ReactChrono" />
			<div className="container">
				{ isClockDisplayed && <Clock onSaveTime={ handleSaveTime } /> }
				<div className="clock-start-container">
					{ !isClockDisplayed && <Button.Primary onClick={ handleClick }>Start</Button.Primary>}
				</div>
				<h2>Times</h2>
				<NotDeletedTimes times={times} onRemoveTime={handleRemoveTime} onRestoreTime={handleRestoreTime} />
				<h2>Bin</h2>
				<DeletedTimes times={times} onRemoveTime={handleRemoveTime} onRestoreTime={handleRestoreTime} />
			</div>
		</>
	);
}

export default App;
