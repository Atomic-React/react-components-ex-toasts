import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen = false, children }) => {

	return (
		isOpen
			? createPortal(
				<div className='modal-overlay'>
					<div className="modal">
						{ children }
					</div>
				</div>,
				document.body
			)
			: null
	);

};

const ModalHeader = ({ children }) => <div className='modal-header'>{ children }</div>;

const ModalContent = ({ children }) => <div className="modal-content">{ children }</div>;

const ModalFooter = ({ children }) => <div className="modal-footer">{ children }</div>;

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;