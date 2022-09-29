import React from 'react';
import ListComponent from "../../components/ListComponent";
import {PermitActions} from "../../../state/actions";
import Loading from "../../components/util/Loading";
import ButtonBar from "../../components/util/ButtonBar";
import {useNavigate} from "react-router-dom";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/util/FriendlyTime";
import {useSelector} from "../../../state/utilities/use_selector";
import {Button} from "@mui/material";

const PermitList = () => {

	const items = useSelector(state => state.Permits.items);
	const loading = useSelector(state => state.Permits.loading);
	const navigate = useNavigate();

	useList(PermitActions, 'area_admin');

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	const renderer = (it) => (
		[
			<td key='org'>{it.organizationname}</td>,
			<td key='ref'>{it.reference}</td>,
			<td key='sd'><FriendlyTime value={it.startdate}/></td>,
			<td key='ed'><FriendlyTime value={it.enddate}/></td>
		]
	)
	return (
		<>
			<h2>Park Permit Assignments</h2>

			<ButtonBar>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/area_admin/permits/add')}
				>Create New Assignment</Button>
			</ButtonBar>

			<ListComponent items={items} headers={['Organization', 'Reference', 'Start Date', 'End Date']}
										 rowRenderer={renderer}/>


		</>
	);
}

export default PermitList;
