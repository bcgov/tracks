import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import {useDispatch} from "react-redux";
import {OperatorActions} from "../../../state/actions";
import Loading from "../../components/util/Loading";
import ButtonBar from "../../components/util/ButtonBar";
import {Button} from "@mui/material";
import {useSelector} from "../../../state/utilities/use_selector";
import {useNavigate} from "react-router-dom";

const OperatorList = () => {
	const detailRoute = `/admin/organizations/view/:id`;

	const items = useSelector(state => state.Operators.items);
	const loading = useSelector(state => state.Operators.loading);

	const dispatch = useDispatch();

	const load = () => dispatch({type: OperatorActions.LIST_REQUEST, payload: {api: 'admin'}})

	const navigate = useNavigate();

	const renderer = (it) => (
		[
			<td key='name'>{it.name}</td>,
			<td key='region'>{it.region}</td>,
			<td key='type'>{it.type}</td>,
			<td key='activity'><em>Placeholder</em></td>,
			<td key='active'>{it.active ? 'Active' : 'Inactive'}</td>
		]
	);

	//the ListComponent will use this if there are no items
	const noItemsRenderer = () => (
		[
			<td key="noitems">No data available.</td>,
			<td key="noitems" />
		]
	);


	useEffect(() => {
		load();
	}, []);

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	return (
		<>
			<h2>Commercial Operators</h2>
			
			<ButtonBar>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/admin/organizations/add')}
				>
						Create New
				</Button>
			</ButtonBar>
			
			<ListComponent 
				items={items.length > 0 ? items : [1]}
				detailRoute={items.length > 0 ? detailRoute : "#"}
				headers={['Name', 'Region', 'Type', 'Last Activity Date', 'Status']}
				rowRenderer={items ? renderer : noItemsRenderer}/>
			
					
		</>
	);
};

export default OperatorList;
