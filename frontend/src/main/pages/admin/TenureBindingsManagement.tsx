import React, {useState} from 'react';
import Loading from "../../components/util/Loading";
import {TenureBindingRequestActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import ListComponent from "../../components/ListComponent";
import FriendlyTime from "../../components/util/FriendlyTime";
import {useSelector} from "../../../state/utilities/use_selector";
import {getConfiguration} from "../../../state/utilities/config_helper";
import {useDispatch} from "react-redux";
import axios from "axios";

const TenureBindingsManagement = () => {

	const {items, loading} = useSelector(state => state.TenureBindingRequests);

	const authHeaders = useSelector(state => state.Auth.headers);
	const configuration = useSelector(getConfiguration);
	const dispatch = useDispatch();

	const [working, setWorking] = useState(false);

	useList(TenureBindingRequestActions, 'admin');

	function sendRequest(id, payload) {
		setWorking(true);

		axios.post(`${configuration.API_BASE}/api/v1/admin/tenure_bindings`,
			{
				...payload,
				id
			},
			{
				headers: authHeaders,
			}).then(() => {
			dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'admin'}});
			setWorking(false);
		}).catch((() => {
			dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'admin'}});
			setWorking(false);
		}));
	}

	function acceptBindingRequest(id) {
		sendRequest(id, {action: 'ACCEPT'})
	}

	//@todo take input from user for reason
	function rejectBindingRequest(id, reason = 'No reason given') {
		sendRequest(id, {action: 'REJECT', reason});
	}

	function renderActionButton(id) {
		return (
			<>
				<br/>
				<input
					disabled={working} type={'button'} value={'Accept'} onClick={() => {
					acceptBindingRequest(id)
				}}
				/>
				<input
					disabled={working} type={'button'} value={'Reject'} onClick={() => {
					rejectBindingRequest(id)
				}}
				/>
			</>
		)
	}

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	const renderer = (it) => (
		[
			<td key={'o'}>{it.organization}</td>,
			<td key={'ref'}>{it.reference}</td>,
			<td key={'rsd'}><FriendlyTime value={it.requested_start_date}/></td>,
			<td key={'red'}><FriendlyTime value={it.requested_end_date}/></td>,
			<td key={'s'}>
				{it.state}
				{it.state === 'SUBMITTED' && renderActionButton(it.id)}
				{it.state === 'REJECTED' && <p>{it.reason}</p>}
			</td>,
			<td key={'t'}><FriendlyTime time from value={it.created}/></td>,
			<td key={'ttls'}>
				<pre>{JSON.stringify(it.tantalisMatch, null, 1)}</pre>
			</td>
		]
	);

	const noItemsRenderer = () => (
		[
			<td key='noitems'>No data available.</td>,
			<td key='noitemsEmpty' colSpan={2}></td>
		]
	)

	return (
		<div>
			<h2>Tenure Binding Requests</h2>

			<ListComponent
				items={items.length > 0 ? items : [1]}
				headers={['Organization', 'Reference (File Number)', 'Requested Started', 'Requested End', 'Request State', 'Request Date', 'TTLS Match Data']}
				rowRenderer={items.length > 0 ? renderer : noItemsRenderer}
			></ListComponent>
		</div>
	);

}
export default TenureBindingsManagement;
