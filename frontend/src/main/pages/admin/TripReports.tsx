import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';

import { selectTripReports } from '../../../state/reducers/tripreports';
import { useSelector } from '../../../state/utilities/use_selector';

import { Typography, Box, Fab, Grid, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText, IconButton, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';

import moment from "moment";

const columns: GridColDef[] = [
	{
		field: 'id', 
		headerName: 'Trip ID',
		flex: 1
	},
	{        
		field: 'submissionDate', 
		headerName: 'Submission Date', 
		flex: 1
	},
	{        
		field: 'status', 
		headerName: 'Status', 
		flex: 1
	},
	{        
		field: 'tenures', 
		headerName: 'Tenures', 
		flex: 1
	},
	{        
		field: 'permits', 
		headerName: 'Permits', 
		flex: 1
	},
	{        
		field: 'activities', 
		headerName: 'Activities', 
		flex: 1
	},
];

const TripReports: FC = () => {

	// Controlled floating menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget); };
	const handleCloseMenu = () => { setAnchorEl(null); };

	// Controlled dialog box
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const handleClickOpenDialog = () => { setOpenDialog(true); };
	const handleCloseDialog = () => { setOpenDialog(false); };

	// Controlled form fields
	const [activities, setActivities] = useState<string[]>([]);
	const [isSubtenant, setIsSubtenant] = useState<string>('no');
	const [sawWildlife, setSawWildlife] = useState<string>('no');
	const [fileName, setFileName] = useState<string>('No file selected.');
	const [fileSize, setFileSize] = useState<number>(0);

	const handleActivitiesChange = (event: SelectChangeEvent) => {
		setActivities(event.target.value as string[]);
	};

	const handleIsSubTenantChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsSubtenant((event.target as HTMLInputElement).value);
	};

	const handleSawWildlifeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSawWildlife((event.target as HTMLInputElement).value);
	};

	const handleFileRemove = () => {
		setFileName('No file selected.');
		setFileSize(0);
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files;
		if(!fileList){
			return;
		} else {
			const sizeInMB: number = Number.parseFloat((fileList[0].size / Math.pow(1024, 2)).toFixed(2));
			setFileName(fileList[0].name);
			setFileSize(sizeInMB)
		}
	}

	// @todo grab data from db regarding trip reports
	const fetchTripReportData = () => {
		//const {id, created_at, updated_at, park_permit_id, tenure_id, state, type, reporting_period_id} = useSelector(selectTripReports);
		const rowData = [];

		const tenures = useSelector(state => state.Tenures);
		const permits = useSelector(state => state.Permits);
		const uploading = useSelector(state => state.TravelPathUpload.uploading);

		const items = useSelector(state => {
			console.log(state.Activities)
			state.Activities.items.map((item, index) => {
				rowData.push({								
					id: item.id || null,
					submissionDate: item.createdat || null,
					status: item.processingstate || null,
					tenures: tenures || null, // This item needs to be processed first
					permits: permits|| null, // This item needs to be processed first
					activities: item || null, // This item needs to be processed first
				});
			})
			
		});


		console.log(items);

		console.log(useSelector(selectTripReports))
		return null;
	};

	// will populate the first cell with a message if no data was found.
	// const rows = fetchTripReportData.length ? 
	// 	fetchTripReportData : 
	// 	[ { id: 'No data was found.', submissionDate: '', status: '' } ];

	const rows = [
		{	
			id: 1,
			submissionDate: moment('2022-11-08'),
			status: 'SUBMITTED',
			tenures: '21937, 27651',
			permits: 'DEF456',
			activities: 'HELI',
		},
		{	
			id: 2,
			submissionDate: moment('2022-11-08'),
			status: 'PENDING',
			tenures: '22314, 33145',
			permits: 'DEF471',
			activities: 'HORSEBACK',
		}
	];

	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<Grid container direction='row'>
					<Grid item>
						<Typography variant='h5'>Trip Reports</Typography> 
					</Grid>
					<div style={{flex: '1 0 0'}} />
					<Grid item>
						<Fab 
							size='medium' 
							color="inherit" 
							aria-label="add" 
							style={{backgroundColor: '#fff'}} 
							disableRipple 
							onClick={handleClickMenu}
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}>
							<AddIcon />
						</Fab>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleCloseMenu}
						>
							<Box sx={{ width: 250 }}>
								<MenuItem onClick={handleClickOpenDialog}>Trip Report</MenuItem>
								<Dialog open={openDialog} onClose={handleCloseDialog}>
									<DialogTitle>Add a Trip Report</DialogTitle>
									<DialogContent>
										<DialogContentText>
											Enter the required fields and associated files below to add a new trip report.
										</DialogContentText>
										<br />
										<FormControl fullWidth>
											<InputLabel>Activities</InputLabel> 
											<Select
												value={activities}
												label="Actvity"
												onChange={handleActivitiesChange}
												multiple
												variant='outlined'
											>
												<MenuItem value={10}>Ten</MenuItem>
												<MenuItem value={20}>Twenty</MenuItem>
												<MenuItem value={30}>Thirty</MenuItem>
											</Select>
										</FormControl>
										<TextField
											margin="normal"
											id="tenure"
											label="Tenure or BC Park Use Permit"
											type="tenure"
											variant="outlined"
											fullWidth
										/>
										<TextField
											margin="normal"
											id="transportation"
											label="Transportation Mode"
											type="transportation"
											variant="outlined"
											fullWidth
										/>

										<FormControl>
											<FormLabel id="demo-controlled-radio-buttons-group">Are you a sub-tenant of the reported tenures?</FormLabel>
											<RadioGroup row name="controlled-radio-buttons-group" value={isSubtenant} onChange={handleIsSubTenantChange}>
												<FormControlLabel value="yes" control={<Radio />} label="Yes" />
												<FormControlLabel value="no" control={<Radio />} label="No" />
											</RadioGroup>
										</FormControl>
										
										<Box>
											<FormLabel>Attach GPX file(s)</FormLabel>
											<FormHelperText>A new travel path will be added to each GPX file. You may include multiple related GPX files in one trip report.</FormHelperText>
											<Grid container direction='row' style={{backgroundColor: 'rgba(134, 142, 150, 0.05)', padding: 7}}>
												<Grid item>
													<IconButton disabled>
														{fileSize ? <DownloadingOutlinedIcon /> : <CheckCircleOutlineOutlinedIcon />}
													</IconButton>
												</Grid>
												<Grid item>
													<Typography align='left' variant='body1'>
														{fileName}
													</Typography>
													<Typography align='left' variant='body2'>
														{fileSize} MB
													</Typography>
												</Grid>
												<div style={{flex: '1 0 0'}} />
												<Grid item>
													<IconButton onClick={handleFileRemove}>
														<DeleteOutlineOutlinedIcon />
													</IconButton>
												</Grid>
											</Grid>
											<Button size='small' startIcon={<AddIcon />} variant='text' component="label">
												Add File
												<input onChange={handleFileChange} type="file" id='gpx' name='gpx-file' hidden />
											</Button>
										</Box>

										<FormControl>
											<FormLabel>Did you see any wildlife?</FormLabel>
											<RadioGroup row name="controlled-radio-buttons-group" value={sawWildlife} onChange={handleSawWildlifeChange}>
												<FormControlLabel value="yes" control={<Radio />} label="Yes" />
												<FormControlLabel value="no" control={<Radio />} label="No" />
											</RadioGroup>
										</FormControl>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleCloseDialog}>Cancel</Button>
										<Button onClick={() => {
											// @todo
											handleCloseDialog();
											handleFileRemove();
										}}>Apply</Button>
									</DialogActions>
								</Dialog>
							</Box>

						</Menu>
					</Grid>
				</Grid>

				<br />
				
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
					disableColumnSelector
				/>
			</Box>
		</>
	);
}

export default TripReports;