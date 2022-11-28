import React from 'react';
import ListComponent from "../../../components/ListComponent";
import {TenureBindingRequestActions} from "../../../../state/actions";
import Loading from "../../../components/util/Loading";
import moment from "moment";
import {useList} from "../../../../state/utilities/use_list";
import {useSelector} from "../../../../state/utilities/use_selector";

const TenureBindingRequests = () => {

	const {items, loading} = useSelector(state => state.TenureBindingRequests);

	useList(TenureBindingRequestActions, 'operator');

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	const renderer = (it) => (
		[
			<td key='ref'>{it.reference}</td>,
			<td key='sd'>{moment(it.created).format('ll')}</td>,
			<td key='state'>{it.state}</td>,
			<td key='reason'>{it.reason}</td>
		]
	)

	return (
		<>
			<h2>Tenure Binding Requests</h2>
			<ListComponent
				items={items}
				headers={['Reference', 'Created', 'Status', 'Reason']}
				rowRenderer={renderer}
			/>
		</>
	);
};

export default TenureBindingRequests;
