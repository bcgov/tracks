import React from 'react';
import ListComponent from "../../../components/ListComponent";
import {PermitActions} from "../../../../state/actions";
import Loading from "../../../components/util/Loading";
import moment from "moment";
import {useList} from "../../../../state/utilities/use_list";
import {useSelector} from "../../../../state/utilities/use_selector";

const PermitList = () => {

	const items = useSelector(state => state.Permits.items);
	const loading = useSelector(state => state.Permits.loading);

	useList(PermitActions, 'operator');

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	const renderer = (it) => (
		[
			<td key='ref'>{it.reference}</td>,
			<td key='sd'>{moment(it.startdate).format('ll')}</td>,
			<td key='ed'>{it.enddate !== null ? moment(it.enddate).format('ll') : ''}</td>
		]
	)

	return (
		<>
			<h2>Park Permits</h2>
			<ListComponent items={items} headers={['Reference', 'Start Date', 'End Date']} rowRenderer={renderer}/>
		</>
	);
}
;

export default PermitList;
