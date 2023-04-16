import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import Button from '../../ui/Button';
import DeleteTimeConfirmationModal from './DeleteTimeConfirmationModal';

const TimeRow = ({ time, createdOn, isDeleted, id, onRemoveTime, onRestoreTime }) => {

	const [ isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen ] = useState(false);

	const handleRemoveTime = () => {
		setIsDeleteConfirmationModalOpen(true);
	};

	const handleCancelConfirmation = () => {
		setIsDeleteConfirmationModalOpen(false);
	};

	const handleConfirmation = () => onRemoveTime(id);

	return (
		<>
			<tr>
				<td>
					{ time }
				</td>
				<td>
					{ createdOn.toLocaleDateString() } { createdOn.toLocaleTimeString() }
				</td>
				<td>
					{
						isDeleted
							? <Button.Warning onClick={onRestoreTime(id)}>Restore</Button.Warning>
							: <Button.Danger onClick={handleRemoveTime}>Delete</Button.Danger>
					}
				</td>
			</tr>
			<DeleteTimeConfirmationModal isOpen={ isDeleteConfirmationModalOpen } onCancel={ handleCancelConfirmation } onSubmitDelete={ handleConfirmation() } />
		</>
	);
};

export default memo(TimeRow, (prevProps, nextProps) => {
	if (prevProps.isDeleted !== nextProps.isDeleted) {
		return false;
	}
	return true;
});

TimeRow.propTypes = {
	time: PropTypes.number.isRequired,
	createdOn: PropTypes.instanceOf(Date).isRequired,
	isDeleted: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired,
	onRemoveTime: PropTypes.func.isRequired,
	onRestoreTime: PropTypes.func.isRequired,
};