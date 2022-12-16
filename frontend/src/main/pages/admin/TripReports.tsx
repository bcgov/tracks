import React, { FC, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Our components
import { ActivityActions } from "../../../state/actions";
import { useList } from "../../../state/utilities/use_list";
import { useSelector } from '../../../state/utilities/use_selector';
import {CreateAdminTenureDialog, CreateTenureDialog} from '../../../main/components/CreateTenureDialog';
import CreateTripReportDialog from '../../../main/components/CreateTripReportDialog';
import { usePrevious } from "../../../state/utilities/use_previous";

// Library Components
import {
	Typography, 
	Box, 
	Fab, 
	Grid, 
	Menu, 
	MenuItem, 
	IconButton
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

const tripReportcolumns: GridColDef[] = [
	{
		field: 'id', 
		headerName: 'Trip ID',
		flex: 1
	},
	{        
		field: 'submissionDate', 
		headerName: 'Submission Date', 
		flex: 2.5
	},
	{        
		field: 'status', 
		headerName: 'Status', 
		flex: 2
	},
	{        
		field: 'tenures', 
		headerName: 'Tenures', 
		flex: 3
	},
	{        
		field: 'permits', 
		headerName: 'Permits', 
		flex: 3
	},
	{        
		field: 'activities', 
		headerName: 'Activities', 
		flex: 3
	},
];

const TripReports: FC = () => {
	// We are using the operator route since there is no discernable difference in action
	const navigate = useNavigate();
	const detailRoute = `/operator/activities/view/:id`;
	const dispatch = useDispatch();

	// Controlled floating menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget); };
	const handleCloseMenu = () => { setAnchorEl(null); };

	// Controlled dialog box
	const [activityDialog, setActivityDialog] = useState<boolean>(false);
	const handleActivityDialog = () => { setActivityDialog(!activityDialog); };

	const [tenureDialog, setTenureDialog] = useState<boolean>(false);
	const handleTenureDialog = () => { setTenureDialog(!tenureDialog); };

	useList(ActivityActions, 'operator');
	const activities = useSelector(state => { return state.Activities.items });
	const fetchTripReportData = () => {
		// @todo we need a way to connect permits and tenures to their respective trip report (activity)
		// there is not a field to display permits or tenures since this is not something we have attached to each trip report
		// GPX files currently upload but have no attachment to any particular trip report (right now this works the same way as travel reports)
		// Update: Robert and I have discussed the potential database changes. It looks like we would possibly need a review on our database structure and that it would be a better sell if we create an associative table to join rather then have a column of arrays containing the ID's of what is associated with the trip report
		const renderedRows = [];
		if(activities.length > 0) {
			activities.map((item) => {
				renderedRows.push ({
					id: item.id,
					submissionDate: moment(item.createdat).format('ll hh:mm:ss'),
					status: item.processingstate,
					tenures: [],
					permits: [],
					activities: [],
				});					
			});
		}
		return renderedRows;
	}

	const [tripReportData, setTripReportData] = useState(fetchTripReportData());
	const [lastUpdated, setLastUpdated] = useState<string>(moment().format('ll hh:mm A'));

	// We need these to check if a user has uploaded a file or not, this allows us to refresh the data when it comes in.
	const uploadSuccess = useSelector(state => state.TravelPathUpload.success);
	const uploading = useSelector(state => state.TravelPathUpload.uploading);
	const previousUploading = usePrevious(uploading);

	// We refresh the list by sending out a dispatch and re-running the fetchTripReport function
	useEffect(() => {
		if (previousUploading && !uploading && uploadSuccess) {
			dispatch({type: ActivityActions.LIST_REQUEST, payload: {api: 'operator'}});
			setTripReportData(fetchTripReportData());
			setLastUpdated(moment().format('ll hh:mm A'));
		}
	}, [uploading]);

	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<Grid container direction='row'>
					<Grid item>
						<Typography variant='h5'>Trip Reports</Typography>
						<span style={{display: 'flex'}}>
							<IconButton disabled size='small'>
								<CachedOutlinedIcon fontSize='small'></CachedOutlinedIcon> &nbsp;
								<Typography>Last updated {lastUpdated}</Typography>
							</IconButton>							
						</span>
					</Grid>
					<div style={{flex: '1 0 0'}} />
					<Grid item>
						<Fab 
							size='medium' 
							color="inherit" 
							aria-label="add" 
							style={{backgroundColor: '#fff'}} 
							disableRipple 
							onClick={handleClickMenu}>
							<AddIcon />
						</Fab>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleCloseMenu}
						>
							<Box sx={{ width: 250 }}>
								<>
									<MenuItem onClick={handleActivityDialog} disableRipple>Add Trip Report(s)</MenuItem>
									<CreateTripReportDialog handleClose={handleActivityDialog} open={activityDialog} />
									<MenuItem onClick={handleTenureDialog} disableRipple>Add Tenure(s)</MenuItem>
									<CreateTenureDialog handleClose={handleTenureDialog} open={tenureDialog} />
								</>
							</Box>
						</Menu>
					</Grid>
				</Grid>

				<br />
				
				<DataGrid
					rows={tripReportData.length ? tripReportData : fetchTripReportData()}
					columns={tripReportcolumns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
					disableColumnSelector
					style={{height: 600}}
					onCellClick={(data) => {
						navigate(detailRoute.replace(':id', data.row.id));
					}}
					sx={{
						'& .MuiDataGrid-row:hover': {
							cursor: 'pointer',
						}
					}}
				/>
								
			</Box>
		</>
	);
}

export default TripReports;