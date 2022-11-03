import React from 'react';
import ListComponent from "../../components/ListComponent";
import {OfficerActions} from "../../../state/actions";
import Loading from "../../components/util/Loading";
import {Button} from "@mui/material";
import ButtonBar from "../../components/util/ButtonBar";
import {useList} from "../../../state/utilities/use_list";
import {useNavigate} from "react-router-dom";
import {useSelector} from "../../../state/utilities/use_selector";

const OfficerList = () => {

	const items = useSelector(state => state.Officers.items);
	const loading = useSelector(state => state.Officers.loading);
	
	const navigate = useNavigate();

	useList(OfficerActions, 'admin');

	const detailRoute = `/admin/officers/view/:id`;

	const renderer = (it) => (
		[
			<td key='name'>{it.name}</td>,
			<td key='region'>{it.region}</td>
		]
	);

	const noItemsRenderer = () => (
		[
			<td key="noitems">No data available.</td>,
			<td key="noitemsEmpty"> </td>
		]
	);

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	return (
		<>
			<h2>Conservation Officers</h2>
			<ButtonBar>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/admin/officers/add')}
					disabled
				>Create New</Button>
			</ButtonBar>

			<ListComponent 
				items={items.length > 0 ? items : [1]} 
				detailRoute={items.length > 0 ? detailRoute : '#'} 
				headers={['Name', 'Region']} 
				rowRenderer={items.length > 0 ? renderer : noItemsRenderer}/>
		</>
	);
};

export default OfficerList;
