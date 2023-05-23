import Header from './components/layout/Header';
import { BiTimer } from 'react-icons/bi';
import Button from './components/ui/Button';
import Clock from './components/features/Clock';
import './App.css';
import { useState } from 'react';
import Times from './components/features/Times';
import withFilteredTimes from './components/features/Times/withFilteredTimes';
import Toast from './components/ui/Toast';

const NotDeletedTimes = withFilteredTimes(Times, ({ times }) => times.filter(({ isDeleted }) => !isDeleted));
const DeletedTimes = withFilteredTimes(Times, (props) => props.times.filter(({ isDeleted }) => isDeleted));

function App() {

	const [ isClockDisplayed, setIsClockDisplayed ] = useState(false);
	const [ times, setTimes ] = useState([]);
	// We initialize the open state for each toast notification. They are all hidden by default.
	const [ isSaveTimeToastOpen, setIsSaveTimeToastOpen ] = useState(false);
	const [ isDeleteTimeToastOpen, setIsDeleteTimeToastOpen ] = useState(false);
	const [ isRestoreTimeToastOpen, setIsRestoreTimeToastOpen ] = useState(false);

	const handleClick = () => {
		setIsClockDisplayed(!isClockDisplayed);
	};

	const handleSaveTime = (time) => {
		setTimes([...times, { id: Date.now(), time, createdOn: new Date(), isDeleted: false }]);
		setIsClockDisplayed(false);
		// If a time is saved, display the "save time" toast notification
		setIsSaveTimeToastOpen(true);
	};

	const handleRemoveTime = (timeId) => () => {
		setTimes((prevTimes) => prevTimes.map(time => {
			if (time.id === timeId) {
				time.isDeleted = true;
			}
			return time;
		}));
		// If a time is deleted, display the "delete time" toast notification
		setIsDeleteTimeToastOpen(true);
	};
	
	const handleRestoreTime = (timeId) => () => {
		setTimes((prevTimes) => prevTimes.map(time => {
			if (time.id === timeId) {
				time.isDeleted = false;
			}
			return time;
		}));
		// If a time is restored, display the "restore time" toast notification
		setIsRestoreTimeToastOpen(true);
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
				{ isSaveTimeToastOpen && <Toast title="Saved" delay={5000} variant="success" message="Time saved successfully" onClose={() => setIsSaveTimeToastOpen(false)} /> }
				{ isDeleteTimeToastOpen && <Toast title="Deleted" variant="danger" message="Time deleted successfully" onClose={() => setIsDeleteTimeToastOpen(false)} /> }
				{ isRestoreTimeToastOpen && <Toast title="Restored" variant="warning" message="Time restored successfully" onClose={() => setIsRestoreTimeToastOpen(false)} /> }
			</div>
		</>
	);
}

export default App;
