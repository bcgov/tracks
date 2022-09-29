import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../util/Loading";
import {getAuthHeaders} from "../../../state/utilities/authentication_helper";
import {useSelector} from "react-redux";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";

import '../../styles/components/map.scss';
import 'leaflet/dist/leaflet.css';

// explicitly import resources -- react-leaflet doesn't for some reason
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

const tileLayers = [
	{
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		name: 'OpenStreetMap',
	},
];

const tileLayer = tileLayers[0];

const TenureDetail = (props) => {

	const {open, handleClose, tenureId} = props;

	const [tenure, setTenure] = useState(null);
	const [loading, setLoading] = useState(false);
	const center = [49, -123];

	const headers = useSelector(getAuthHeaders);

	useEffect(() => {
		if (tenureId != null) {
			setLoading(true);
			axios.get(`${window.CONFIG.API_BASE}/api/v1/ttls/tenures/${tenureId}`, {
				headers
			}
			).then(response => {
				setTenure(response.data);
				setLoading(false);
			})
		}
	}, [tenureId]
	)
	;


	if (tenureId == null) {
		return null;
	}

	const renderContent = () => {
		if (tenure == null) {
			return null;
		}
		return (
			<>

				<h2>{tenure.locationDescription}</h2>
				<MapContainer
					id="mapDemo"
					center={center}
					zoom={6}
					scrollWheelZoom={true}
				>
					<TileLayer
						attribution={tileLayer.attribution}
						url={tileLayer.url}
					/>


					{tenure.parcels.map((p, i) => (<GeoJSON key={`layer-${i}`} data={JSON.parse(p.geometry)} pathOptions={{fillColor: 'blue'}}/>))}

				</MapContainer>


			</>
		);
	}


	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
			<DialogTitle id="form-dialog-title">Tenure Detail</DialogTitle>
			<DialogContent>

				<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
					{loading && (<Loading/>)}
					{loading || (renderContent())}

				</Box>

			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>

			</DialogActions>
		</Dialog>
	);
};


export
{
	TenureDetail
};
