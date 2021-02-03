import React from 'react';
import CONFIG from "../../../config";
import {useParams} from "react-router";
import TravelPathMap from "../../components/TravelPathMap";
import {useHistory} from "react-router-dom";

const TravelPathDetail = () => {

  const path = `${CONFIG.API_BASE}/api/v1/officer/travel_paths/:id`;
  const params = useParams();
  const history = useHistory();

  const renderer = (it) => (
    <>
      <div className={'travelPathPanel'}>

        <div className='metadataPanel'>
          <dl>
            <dt>Database ID</dt>
            <dd>{it.id}</dd>

            <dt>Mode</dt>
            <dd>{it.mode}</dd>

            <dt>Organization</dt>
            <dd>{it.organizationname}</dd>

            <dt>Start Date</dt>
            <dd>{it.startdate}</dd>

            <dt>End Date</dt>
            <dd>{it.enddate}</dd>

            <dt>Created At</dt>
            <dd>{it.createdat}</dd>

            <dt>Centroid</dt>
            <dd> {JSON.stringify(it.centroid.coordinates)}</dd>

            <dt>Length (meters)</dt>
            <dd>{Math.round(it.meters / 100) * 100}</dd>

          </dl>

        </div>

        <TravelPathMap geometry={it.geometry} center={[it.centroid.coordinates[1], it.centroid.coordinates[0]]} />
      </div>
      {(history.length >= 1) &&
      <button onClick={() => history.goBack()}>Go back</button>
      }
    </>);

  return (
    <>
      <h2>Travel Path Detail</h2>
      {/*<DetailComponent id={params.id} path={path} renderer={renderer} />*/}
    </>
  );
};

export default TravelPathDetail;
