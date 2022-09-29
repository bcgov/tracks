import React from 'react';
import '../../styles/components/loading.scss';
import moment from "moment";
import '../../styles/components/friendly_time.scss';

// old defaults
// until: false,
// 	from: false,
// 	time: false

const FriendlyTime = ({value, from, until, time}) => {

	let formatString = 'll';
	if (time) {
		formatString = 'll HHmm[h] ZZ'
	}

	const fromSpan = () => (<span className={'relativeTime'}>{moment(value).fromNow()}</span>);
	const untilSpan = () => (<span className={'relativeTime'}>{moment(value).toNow()}</span>);

	if (value == null) {
		return (<></>);
	}

	return (
		<div className={'friendlyTime'}>
			<span className={'absoluteTime'}>{moment(value).format(formatString)}</span>
			{from && fromSpan()}
			{until && untilSpan()}
		</div>
	);
}
export default FriendlyTime;
