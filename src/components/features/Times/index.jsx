import { arrayOf, bool, func, instanceOf, number, shape } from 'prop-types';
import TimeRow from './TimeRow';
import './Times.css';

const Times = ({ times, onRemoveTime, onRestoreTime }) => {

	return (
		<div className="times-table-container">
			<table className="times-table">
				<thead>
					<tr>
						<th>Time</th>
						<th>Created On</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						times.map(time => <TimeRow key={time.id} {...time} onRemoveTime={onRemoveTime} onRestoreTime={onRestoreTime} />)
					}
				</tbody>
			</table>
		</div>
	);
};

export default Times;

Times.propTypes = {
	times: arrayOf(
		shape({
			id: number.isRequired,
			isDeleted: bool.isRequired,
			createdOn: instanceOf(Date).isRequired,
			time: number.isRequired,
		}).isRequired
	).isRequired,
	onRemoveTime: func.isRequired,
	onRestoreTime: func.isRequired,
};