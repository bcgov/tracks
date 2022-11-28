import React, { FC, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Our components
import { ActivityActions, TenureActions } from "../../../state/actions";
import { useList } from "../../../state/utilities/use_list";
import { useSelector } from '../../../state/utilities/use_selector';
import CreateTenureDialog from '../../../main/components/CreateTenureDialog';
import CreateTripReportDialog from '../../../main/components/CreateTripReportDialog';

// Library Components
import {
	Typography, 
	Box, 
	Fab, 
	Grid, 
	Menu, 
	MenuItem, 
	Switch,
	FormControlLabel,
	FormGroup,
	Button
} from '@mui/material';
import { DataGrid, GridColDef, GridCellValue } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const tripReportcolumns: GridColDef[] = [
	{
		field: 'id', 
		headerName: 'Trip ID',
		flex: 1
	},
	{        
		field: 'submissionDate', 
		headerName: 'Submission Date', 
		flex: 3
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

const tenureColumns: GridColDef[] = [
	{
		field: 'id', 
		headerName: 'Trip ID',
		flex: 1
	},
	{        
		field: 'reference', 
		headerName: 'Reference', 
		flex: 2
	},
	{        
		field: 'subtenures', 
		headerName: 'Sub-Tenures', 
		flex: 2
	},
	{        
		field: 'startdate', 
		headerName: 'Start Date', 
		flex: 3
	},
	{        
		field: 'enddate', 
		headerName: 'End Date', 
		flex: 3
	},
	{        
		field: 'approve', 
		headerName: 'Approval', 
		flex: 2,
		sortable: false,
		renderCell: (params) => {
			const onClick = (e) => {
				e.stopPropagation();
				const thisRow = params.row;	
				return alert(JSON.stringify(thisRow, null, 4));
			};
			return <Button onClick={onClick}>Approve</Button>
		}
	},
];

const TripReports: FC = () => {
	// We are using the operator route since there is no discernable difference in action
	const navigate = useNavigate();
	const detailRoute = `/operator/activities/view/:id`;

	// Controlled tenure table view
	const isAdmin: boolean = useSelector(state => {return state.Auth.roles.includes('admin')});
	const [adminView, setAdminView] = useState<boolean>(false);
	const [tenureView, setTenureView] = useState<boolean>(false);

	// Controlled floating menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget); };
	const handleCloseMenu = () => { setAnchorEl(null); };

	// Controlled dialog box
	const [activityDialog, setActivityDialog] = useState<boolean>(false);
	const handleActivityDialog = () => { 
		setActivityDialog(!activityDialog); 
	};

	const [tenureDialog, setTenureDialog] = useState<boolean>(false);
	const handleTenureDialog = () => { 
		setTenureDialog(!tenureDialog); 
	};

	useList(ActivityActions, 'operator');
	const fetchTripReportData = () => {

		// we won't use these until we can connect them to their respective trip reports
		// const permits = useSelector(state => {return state.Permits.items});
		// const tenures = useSelector(state => {return state.Tenures.items});

		// const permitReferences = [];
		// const tenureReferences = [];

		// @todo we need a way to connect permits and tenures to their respective trip report (activity)
		// currently there is not a field to display the actual activity (heli-skiing, etc) in the DB, we only store the mode of transportation, which does not fit on the table contextually.
		// there is not a field to display permits or tenures since this is not something we have attached to each trip report
		// GPX files currently upload but have no attachment to any particular trip report
		// Update: Robert and I have discussed the potential database changes. It looks like we would possibly need a review on our database structure and that it would be a better sell if we create an associative table to join rather then have a column of arrays containing the ID's of what is associated with the trip report

		const activities = useSelector(state => {return state.Activities.items});
		
		if(activities.length) {
			const rowData = activities.map((item) => {
				return { 
					id: item.id,
					submissionDate: item.createdat,
					status: item.processingstate,
					tenures: [],
					permits: [],
					activities: [],
				}
			});
			return rowData;
		} else {
			return [ { id: '', submissionDate: 'No data was found.', status: '' } ];
		}
	}

	useList(TenureActions, 'operator');
	const fetchTenureData = () => {
		const tenures = useSelector(state => {return state.Tenures.items});
		if(tenures.length) {
			tenures.map((item) => {
				return {
					id: item.id,
					reference: item.reference,
					subtenures: item.subtenures,
					startdate: item.startdate,
					enddate: item.enddate,
				}
			});
		}
		return tenures;
	}

	const tripReportRows = fetchTripReportData();
	const tenureRows = fetchTenureData();

	useEffect(() => {
		if(isAdmin) {
			setAdminView(true);
		}
	}, []);

	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<Grid container direction='row'>
					<Grid item>
						<Typography variant='h5'>{tenureView ? "Tenures" : "Trip Reports"}</Typography> 
						{ adminView ? (
							<FormGroup>
								<FormControlLabel control={<Switch onClick={() => setTenureView(!tenureView)}/>} label={'Change View'} />
							</FormGroup>
						) : null }
						
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
								<MenuItem onClick={handleActivityDialog} disableRipple>Add Trip Report(s)</MenuItem>
								<CreateTripReportDialog handleClose={handleActivityDialog} open={activityDialog} />
								<MenuItem onClick={handleTenureDialog} disableRipple>Add Tenure(s)</MenuItem>
								<CreateTenureDialog handleClose={handleTenureDialog} open={tenureDialog} />
							</Box>
						</Menu>
					</Grid>
				</Grid>

				<br />
				{
					tenureView ? (
						<DataGrid
							rows={tenureRows}
							columns={tenureColumns}
							pageSize={10}
							rowsPerPageOptions={[10]}
							disableSelectionOnClick
							autoHeight
						/>
					) : (
						<DataGrid
							rows={tripReportRows}
							columns={tripReportcolumns}
							pageSize={10}
							rowsPerPageOptions={[10]}
							disableSelectionOnClick
							disableColumnSelector
							autoHeight
							onCellClick={(data) => {
								navigate(detailRoute.replace(':id', data.row.id));
							}}
						/>
					)
				}
				
			</Box>
		</>
	);
}

export default TripReports;