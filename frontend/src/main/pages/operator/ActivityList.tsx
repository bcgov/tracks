import React, {useEffect, useState} from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/util/Loading";
import {useDispatch} from "react-redux";
import {ActivityActions, PermitActions, TenureActions} from "../../../state/actions";
import CreateActivityDialog from "../../components/CreateActivityDialog";
import {Button} from "@mui/material";
import ButtonBar from "../../components/util/ButtonBar";
import {usePrevious} from "../../../state/utilities/use_previous";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/util/FriendlyTime";
import {useSelector} from "../../../state/utilities/use_selector";

const ActivityList = () => {
	const detailRoute = `/operator/activities/view/:id`;

	const [referenceData, setReferenceData] = useState({
		modes: ['WALK', 'CYCLE', 'FLY', 'HORSEBACK', 'WATERCRAFT', 'MOTOR VEHICLE (ON ROAD)', 'MOTOR VEHICLE (OFFROAD)', 'MIXED'],
	});

	const [modalOpen, setModalOpen] = useState(false);
	const handleClose = () => {
		setModalOpen(false);
	}
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


	if ((loading || items === undefined) || tenuresLoading || permitsLoading) {
		return (<Loading/>);
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
			<h2>Travel Path Reports</h2>

			<CreateActivityDialog modes={referenceData.modes}
				tenures={tenures}
				permits={permits}
				open={modalOpen}
				handleClose={handleClose}/>

			<ButtonBar>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setModalOpen(true)}
				>Create Travel Path Report</Button>
			</ButtonBar>

			<ListComponent items={items} detailRoute={detailRoute}
										 headers={['Created', 'Mode', 'State', 'Start Time', 'End Time']}
										 rowRenderer={renderer}/>


		</>
	);
};


export default ActivityList;
