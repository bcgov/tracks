import React from 'react';
import {useParams} from "react-router";
import ActivityMap from "../../components/ActivityMap";

const ActivityDetail = () => {

  const params = useParams();

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

        <ActivityMap geometry={it.geometry} center={[it.centroid.coordinates[1], it.centroid.coordinates[0]]} />
      </div>

    </>);

  return (
    <>
      <h2>Travel Path Detail</h2>
      {/*<DetailComponent id={params.id} path={path} renderer={renderer} />*/}
    </>
  );
};

export default ActivityDetail;
