import React, {useState} from 'react';
import {GeoJSON, MapContainer, TileLayer} from 'react-leaflet';
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

//  center: [49, -123]

const ActivityMap = ({center, geometry}) => {

	const [tileLayer, setTileLayer] = useState(tileLayers[0]);

	return (
		<>
			<MapContainer
				id="mapDemo"
				center={center}
				zoom={11}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution={tileLayer.attribution}
					url={tileLayer.url}
				/>

				<GeoJSON data={geometry}>

				</GeoJSON>

			</MapContainer>
		</>
	);

};


export default ActivityMap;
