import React, {useState} from 'react';
import {GeoJSON, MapContainer, TileLayer} from 'react-leaflet';
import '../styles/components/map.scss';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const tileLayers = [
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    name: 'OpenStreetMap',
  },
];

const ActivityMap = (props) => {
  const [tileLayer, setTileLayer] = useState(tileLayers[0]);

  return (
    <>
      <MapContainer
        id="mapDemo"
        center={props.center}
        zoom={11}
      >
        <TileLayer
          attribution={tileLayer.attribution}
          url={tileLayer.url}
        />

        <GeoJSON data={props.geometry}>

        </GeoJSON>

      </MapContainer>
    </>
  );

};

ActivityMap.defaultProps = {
  center: [49, -123]
}

ActivityMap.propTypes = {
  geometry: PropTypes.any,
}

export default ActivityMap;
