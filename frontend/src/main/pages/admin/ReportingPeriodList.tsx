import React from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/util/Loading";
import {ReportingPeriodActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/util/FriendlyTime";
import {useSelector} from "../../../state/utilities/use_selector";

const ReportingPeriodList = () => {
	const items = useSelector(state => state.ReportingPeriods.items);
	const loading = useSelector(state => state.ReportingPeriods.loading);

	useList(ReportingPeriodActions, 'shared');

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	const renderer = (it) => (
		[
			<td key={'sd'}><FriendlyTime value={it.start_date}/></td>,
			<td key={'ed'}><FriendlyTime value={it.end_date}/></td>,
			<td key={'pp'}><FriendlyTime value={it.deadline} from/></td>
		]
	)

	return (
		<>
			<h2>Reporting Periods</h2>

			<ListComponent items={items}
										 headers={['Period Start', 'Period End', 'Deadline']}
										 rowRenderer={renderer}/>

		</>
	);
};


export default ReportingPeriodList;
