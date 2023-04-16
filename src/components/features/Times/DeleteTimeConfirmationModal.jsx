import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

const DeleteTimeConfirmationModal = ({ isOpen, onCancel, onSubmitDelete }) => {

	return (
		<Modal isOpen={ isOpen }>
			<Modal.Header>
				<h3>Delete time ?</h3>
			</Modal.Header>
			<Modal.Content>
				If you delete this registered time, you could still restore it from bin.
			</Modal.Content>
			<Modal.Footer>
				<Button.Primary onClick={ onCancel }>Cancel</Button.Primary>
				<Button.Danger onClick={ onSubmitDelete }>Delete</Button.Danger>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteTimeConfirmationModal;