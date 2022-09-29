import React from 'react';
import '../styles/components/map.scss';
import 'leaflet/dist/leaflet.css';
import ActivityMap from "./maps/ActivityMap";


const ActivityDetailComponent = ({travelPath}) => {

	const hasGeometry = (travelPath.geometry !== null && travelPath.coordinates !== null);
	let mapCenter = null;

	if (hasGeometry) {
		mapCenter = [travelPath.centroid.coordinates[1], travelPath.centroid.coordinates[0]];
	}

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

						<dt>Length (meters)</dt>
						<dd>{Math.round(travelPath.meters / 100) * 100}</dd>

					</dl>

				</div>

				{hasGeometry && <ActivityMap geometry={travelPath.geometry} center={mapCenter}/>
				}
				{hasGeometry ||
					<p>No coordinate data exists for this travel path (perhaps import failed or the track was empty)</p>}
			</div>
		</>
	);
};


export default ActivityDetailComponent;
