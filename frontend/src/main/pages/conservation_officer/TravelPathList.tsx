import React, {useEffect, useState} from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {TravelPathActions} from "../../../state/actions";
import CreateTravelPathDialog from 'src/main/components/CreateTravelPathDialog';

const TravelPathList = () => {
  const detailRoute = `/operator/travel_paths/view/:id`;

  const [referenceData, setReferenceData] = useState({
    modes: ['WALK', 'CYCLE', 'FLY', 'HORSEBACK', 'WATERCRAFT', 'MOTOR VEHICLE (ON ROAD)', 'MOTOR VEHICLE (OFFROAD)', 'MIXED'],
  });

  const [modalOpen, setModalOpen] = useState(false);


  const items = useSelector(state => state.TravelPaths.items);
  const loading = useSelector(state => state.TravelPaths.loading);

  const dispatch = useDispatch();
  const load = () => dispatch({type: TravelPathActions.LIST_REQUEST, payload: {api: 'officer'}})

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    // update();

  }, []);

  const handleClose = () => {
    setModalOpen(false);
    // setLoaded(false);
    // update();
  }

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'d'}>{it.createdat}</td>,
      <td key={'m'}>{it.mode}</td>,
      <td key={'ps'}>{it.processingstate}</td>,
      <td key={'sd'}>{it.startdate}</td>,
      <td key={'ed'}>{it.enddate}</td>
    ]
  )

  return (
    <>
      <h2>My Travel Paths</h2>
      {/*<CreateTravelPathDialog referenceData={referenceData} open={modalOpen} handleClose={handleClose} />*/}

      <ListComponent items={items} detailRoute={detailRoute}
                     headers={['Created', 'Mode', 'State', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />

    </>
  );
};


export default TravelPathList;
