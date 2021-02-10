import React, {useEffect, useState} from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {ActivityActions, ReportActions} from "../../../state/actions";
import CreateActivityDialog from '../../components/CreateActivityDialog';
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/FriendlyTime";

const ActivityList = () => {
  const detailRoute = `/operator/activities/view/:id`;

  const [referenceData, setReferenceData] = useState({
    modes: ['WALK', 'CYCLE', 'FLY', 'HORSEBACK', 'WATERCRAFT', 'MOTOR VEHICLE (ON ROAD)', 'MOTOR VEHICLE (OFFROAD)', 'MIXED'],
  });

  const [modalOpen, setModalOpen] = useState(false);

  const items = useSelector(state => state.Activities.items);
  const loading = useSelector(state => state.Activities.loading);

  useList(ActivityActions, 'officer');

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
      <td key={'d'}>
        <FriendlyTime value={it.createdat} time from/>
      </td>,
      <td key={'m'}>{it.mode}</td>,
      <td key={'ps'}>{it.processingstate}</td>,
      <td key={'sd'}>
        <FriendlyTime value={it.starttime} time/>
      </td>,
      <td key={'ed'}>
        <FriendlyTime value={it.endtime} time/>
      </td>
    ]
  )

  return (
    <>
      <h2>Activities</h2>
      {/*<CreateActivityDialog referenceData={referenceData} open={modalOpen} handleClose={handleClose} />*/}

      <ListComponent items={items} detailRoute={detailRoute}
                     headers={['Created', 'Mode', 'State', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />

    </>
  );
};


export default ActivityList;
