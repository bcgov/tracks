import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../util/Loading";
import {getAuthHeaders} from "../../../state/utilities/authentication_helper";
import {useSelector} from "react-redux";
import {TitleBarButtonContainer} from "../util/title";
import {TracksTable} from "../util/tracks_table";
import {TenureDetail} from "./TenureDetail";
import {getConfiguration} from "../../../state/utilities/config_helper";
import {Alert, Box} from "@mui/material";
import {ConstructionOutlined, Dangerous, MessageOutlined} from "@mui/icons-material";


const reportsHeaders = [
	{title: 'TTLS ID', filterable: true, accessor: (r) => r.id},
	{title: 'TTLS File Number', filterable: true, accessor: (r) => r.fileNumber},
	{title: 'Description', filterable: true, accessor: (r) => r.locationDescription},
	{title: 'TTLS Purpose Code', filterable: true, accessor: (r) => r.purposeCode},
	{title: 'TTLS Land Use Code', filterable: true, accessor: (r) => r.landUseTypeCode},
	{title: 'TTLS Stage Code', filterable: true, accessor: (r) => r.stageCode},
	{title: 'TTLS Status Code', filterable: true, accessor: (r) => r.statusCode},
];

const TenureList = () => {

	const [tenures, setTenures] = useState([]);
	const [loading, setLoading] = useState(false);

	const headers = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedTenure, setSelectedTenure] = useState(null);

	const handleClose = () => {
		setDialogOpen(false);
	}

	const handleSelection = (id) => {
		setSelectedTenure(id);
		setDialogOpen(true);
	};

	useEffect(() => {
		setLoading(true);
		axios.get(`${configuration.API_BASE}/api/v1/ttls/tenures`, {
			headers
		}
		).then(response => {
			setTenures(response.data);
			setLoading(false);
		})

	}, []
	)
	;

	if (loading) {
		return (<Loading/>);
	}

	return (
		<>
			<TitleBarButtonContainer title={'TTLS Available Tenures'}>
			</TitleBarButtonContainer>

			<Alert title={"Demo"} color={"warning"} icon={<ConstructionOutlined/>}>
				<span style={{fontWeight: 'bold'}}>Alpha-quality preview. Things that don't work yet:</span>
				<ul>
					<li>Filtering/pagination</li>
					<li>GeoJSON Layers</li>
					<li>Probably other stuff</li>
				</ul>
			</Alert>

			<TracksTable headers={reportsHeaders}
									 data={tenures}
									 rowClickHandler={r => handleSelection(r.id)}
									 pagination={{
										 isPaginated: true,
										 pageNumber: 1,
										 totalPages: 1
									 }}
			/>
			<TenureDetail open={dialogOpen} handleClose={handleClose} tenureId={selectedTenure}/>
		</>
	);
};


export
{
	TenureList
};
