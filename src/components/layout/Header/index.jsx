import './Header.css';

const Header = ({ brandIcon, brandName }) => {

	return (
		<header className="header">
			<a className="header-brand" href="#">
				{ brandIcon }
				<span>{ brandName }</span>
			</a>
		</header>
	);
};

export default Header;