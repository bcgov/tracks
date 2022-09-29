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
	)

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
				>Create New</Button>
			</ButtonBar>

			<ListComponent items={items} detailRoute={detailRoute} headers={['Name', 'Region']} rowRenderer={renderer}/>
		</>
	);
};

export default OfficerList;
