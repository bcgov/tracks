import React, {useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import '../styles/map.scss';
import 'leaflet/dist/leaflet.css';

const tileLayers = [
    {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        name: 'OpenStreetMap',
    },
];

const LeafletDemo = () => {
    const [tileLayer, setTileLayer] = useState(tileLayers[0]);

    return (
        <>
            <h2>Map Demo</h2>
            <MapContainer
                id="mapDemo"
                center={[49, -123]}
                zoom={7}
            >
                <TileLayer
                    attribution={tileLayer.attribution}
                    url={tileLayer.url}
                />

            </MapContainer>
        </>
    );

};

export default LeafletDemo;
