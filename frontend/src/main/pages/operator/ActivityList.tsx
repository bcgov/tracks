import React, {useEffect, useRef, useState} from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {ActivityActions, PermitActions, ReportActions, TenureActions} from "../../../state/actions";
import CreateActivityDialog from "../../components/CreateActivityDialog";
import {Button} from "@material-ui/core";
import ButtonBar from "../../components/ButtonBar";
import {usePrevious} from "../../../state/utilities/use_previous";
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

  const tenuresLoading = useSelector(state => state.Tenures.loading);
  const tenures = useSelector(state => state.Tenures.items);

  const permitsLoading = useSelector(state => state.Permits.loading);
  const permits = useSelector(state => state.Permits.items);

  const uploadSuccess = useSelector(state => state.TravelPathUpload.success);
  const uploading = useSelector(state => state.TravelPathUpload.uploading);

  const dispatch = useDispatch();

  useList(ActivityActions, 'operator');
  useList(TenureActions, 'operator');
  useList(PermitActions, 'operator');

  const previousUploading = usePrevious(uploading);

  useEffect(() => {
    if (previousUploading && !uploading && uploadSuccess) {
      //we were uploading and now we're not, and the upload worked. reload the list.
      dispatch({type: ActivityActions.LIST_REQUEST, payload: {api: 'operator'}});
    }
  }, [uploading]);

  const handleClose = () => {
    setModalOpen(false);
  }

  if ((loading || items === undefined) || tenuresLoading || permitsLoading) {
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

      <CreateActivityDialog modes={referenceData.modes}
                            tenures={tenures}
                            permits={permits}
                            open={modalOpen}
                            handleClose={handleClose} />

      <ButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >Create Activity</Button>
      </ButtonBar>

      <ListComponent items={items} detailRoute={detailRoute}
                     headers={['Created', 'Mode', 'State', 'Start Time', 'End Time']}
                     rowRenderer={renderer} />


    </>
  );
};


export default ActivityList;
