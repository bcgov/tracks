import React from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/util/Loading";
import {ReportActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/util/FriendlyTime";
import {Button} from "@mui/material";
import axios from "axios";
import {getAuthHeaders} from "../../../state/utilities/authentication_helper";
import {useSelector} from "../../../state/utilities/use_selector";
import {getConfiguration} from "../../../state/utilities/config_helper";

const ReportList = () => {
	const detailRoute = `/operator/reports/view/:id`;

	const items = useSelector(state => state.Reports.items);
	const loading = useSelector(state => state.Reports.loading);
	const configuration = useSelector(getConfiguration);
	const authHeaders = useSelector(getAuthHeaders);

	// const [exportRequests, setExportRequests] = useState([]);

	useList(ReportActions, 'area_admin');


	if (loading || items === undefined) {
		return (<Loading/>);
	}

	function requestExport(id) {
		console.dir(`requesting export of ${id}`);
		const payload = {
			reportIds: [id]
		};

		axios.post(`${configuration.API_BASE}/api/v1/area_admin/exports`, payload, {
			headers: authHeaders
		}).then(response => {
			console.dir(response);
		});
	}

	const renderer = (it) => (
		[
			<td key={'o'}>{it.organizationname}</td>,
			<td key={'t'}>{it.parkpermit}</td>,
			<td key={'st'}>{it.state}</td>,
			<td key={'sd'}><FriendlyTime value={it.period_start_date}/></td>,
			<td key={'ed'}><FriendlyTime value={it.period_end_date}/></td>,
			<td key={'pp'}><FriendlyTime value={it.updated_at} from/></td>,
			<td key={'ex'}><Button onClick={() => requestExport(it.id)}>Export</Button></td>
		]
	)

	return (
		<>
			<h2>Travel Path Reports</h2>

			<ListComponent items={items}
				//detailRoute={detailRoute}
										 headers={['Organization', 'Park Permit', 'State', 'Period Start', 'Period End', 'Updated', 'Export']}
										 rowRenderer={renderer}/>

		</>
	);
};


export default ReportList;
