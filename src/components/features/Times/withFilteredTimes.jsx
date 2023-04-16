const withFilteredTimes = (WrappedTimesTable, selectTimes) => {

	const FilteredTimes = (props) => {
		const times = selectTimes(props);
		return <WrappedTimesTable {...props} times={ times } />;
	};

	return FilteredTimes;
};

export default withFilteredTimes;