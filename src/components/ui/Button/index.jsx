import { node, oneOf } from 'prop-types';
import './Button.css';

const Button = ({ children, variant, ...rest }) => {

	return (
		<button className={`btn btn--${variant}`} {...rest}>{ children }</button>
	);
};

const PrimaryButton = ({ children, ...rest }) => {
	return <Button { ...rest }>{ children }</Button>;
};

const DangerButton = ({ children, ...rest }) => {
	return <Button variant="danger" { ...rest }>{ children }</Button>;
};

const WarningButton = ({ children, ...rest }) => {
	return <Button variant="warning" { ...rest }>{ children }</Button>;
};

const SuccessButton = ({ children, ...rest }) => {
	return <Button variant="success" { ...rest }>{ children }</Button>;
};

Button.Primary = PrimaryButton;
Button.Danger = DangerButton;
Button.Warning = WarningButton;
Button.Success = SuccessButton;

export default Button;

Button.propTypes = {
	children: node.isRequired,
	variant: oneOf(['primary', 'danger', 'warning', 'success']),
};

Button.defaultProps = {
	variant: 'primary'
};

PrimaryButton.propTypes = {
	children: node.isRequired,
};

DangerButton.propTypes = {
	children: node.isRequired,
};

WarningButton.propTypes = {
	children: node.isRequired,
};

SuccessButton.propTypes = {
	children: node.isRequired,
};