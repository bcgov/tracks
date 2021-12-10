import React, {useState} from 'react';
import '../../styles/components/contextualMetadata.scss'
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import PropTypes from "prop-types";

import {fromLatLon} from "utm";
import {Button} from "@material-ui/core";
import {LatLngExpression} from "leaflet";

const tileLayers = [
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    name: 'OpenStreetMap',
  },
];


const PinMarker: React.FC<{setCoordinates: ({latlng, utm}) => void}> = (props) => {
  const [marker, setMarker] = useState(null);
  const {setCoordinates} = props;

  const map = useMapEvents({
    click(e) {
      setMarker({
        position: e.latlng
      });
      console.dir(e);
      const utmCoords = fromLatLon(e.latlng.lat, e.latlng.lng);
      console.dir(utmCoords);
      map.flyTo(e.latlng, map.getZoom())
      setCoordinates({
        latlng: e.latlng,
        utm: utmCoords
      })
    }
  });

  if (marker == null) {
    return null;
  }

  return (
    <Marker key={`marker`} position={marker.position}>
      <Popup>
        <span>Dropped Pin <br /></span>
      </Popup>
    </Marker>
  )
};

const PinPicker: React.FC<{center?: LatLngExpression}> = (props) => {
  const [tileLayer, setTileLayer] = useState(tileLayers[0]);

  const [coordinates, setCoordinates] = useState(null);

  return (
    <>
      <h4>Drop a pin to create an observation</h4>
      <MapContainer
        id="mapDemo"
        center={props.center}
        zoom={9}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution={tileLayer.attribution}
          url={tileLayer.url}
        />

        <PinMarker setCoordinates={setCoordinates} />

      </MapContainer>

      {coordinates != null && <div>
        <h4>Event Coordinates</h4>
        <dl>
          <dt>Latitude</dt>
          <dd>{coordinates.latlng.lat}</dd>
          <dt>Longitude</dt>
          <dd>{coordinates.latlng.lng}</dd>
          <dt>Northing</dt>
          <dd>{coordinates.utm.northing}</dd>
          <dt>Easting</dt>
          <dd>{coordinates.utm.easting}</dd>
          <dt>UTM Zone</dt>
          <dd>{coordinates.utm.zoneLetter}</dd>
        </dl>
        <Button variant={"contained"}>Create Observation Here</Button>
      </div>}

    </>
  );
}

PinPicker.defaultProps = {
  center: [49, -123]
}

export default PinPicker;
