import React from 'react';
import '../styles/map.scss';
import 'leaflet/dist/leaflet.css';
import TravelPathMap from "./TravelPathMap";

const TravelPathDetailComponent = (props) => {

  const {travelPath} = props;

  return (
    <>
      <div className={'travelPathPanel'}>

        <div className='metadataPanel'>
          <dl>
            <dt>Database ID</dt>
            <dd>{travelPath.id}</dd>

            <dt>Mode</dt>
            <dd>{travelPath.mode}</dd>

            <dt>Organization</dt>
            <dd>{travelPath.organizationname}</dd>

            <dt>Start Date</dt>
            <dd>{travelPath.startdate}</dd>

            <dt>End Date</dt>
            <dd>{travelPath.enddate}</dd>

            <dt>Created At</dt>
            <dd>{travelPath.createdat}</dd>

            <dt>Centroid</dt>
            <dd> {JSON.stringify(travelPath.centroid.coordinates)}</dd>

            <dt>Length (meters)</dt>
            <dd>{Math.round(travelPath.meters / 100) * 100}</dd>

          </dl>

        </div>

        <TravelPathMap geometry={travelPath.geometry}
                       center={[travelPath.centroid.coordinates[1], travelPath.centroid.coordinates[0]]} />
      </div>
    </>
  );
};


export default TravelPathDetailComponent;
