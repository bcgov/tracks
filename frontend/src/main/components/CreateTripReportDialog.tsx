import React, { useState, ChangeEvent, useCallback } from "react";
import { useList } from "../../state/utilities/use_list";

import {
	Grid,
	Typography,
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogContentText, 
	DialogTitle, 
	Button, 
	// Radio, 
	// RadioGroup, 
	// FormControlLabel, 
	FormControl, 
	FormLabel, 
	FormHelperText, 
	IconButton, 
	InputLabel,
	Select, 
	SelectChangeEvent,
	MenuItem
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useDispatch, useSelector } from "react-redux";

import FileSubmissionDrop from '../components/util/FileSubmissionDrop';
import { 
	// PermitActions, 
	TenureActions, 
	TRAVEL_PATH_UPLOAD_REQUEST 
} from "../../state/actions";

class TripReportDialogProps {
	open: boolean;
	handleClose: () => void;
}

const CreateTripReportDialog = ({open, handleClose}: TripReportDialogProps) => {

	// Controlled form fields
	const dispatch = useDispatch();
	const [referenceModes, setReferenceModes] = useState({
		modes: ['Helicopter', 'Plane', 'Horseback', 'Hiking']
	});
	const [referenceActivities, setReferenceActivities] = useState({
		activities: ['Heli-skiing', 'Heli-mountain biking', 'Sightseeing', 'Other']
	});
	
	const [activities, setActivities] = useState<string>('');
	const [activityError, setActivityError] = useState<string>('');

	const [tenures, setTenures] = useState<string>('');
	const [tenureError, setTenureError] = useState<string>('');

	const [permits, setPermits] = useState<string>('');
	// const [permitError, setPermitError] = useState<string>('');

	const [mode, setMode] = useState<string>('');
	const [modeError, setModeError] = useState<string>('');

	// const [isSubtenant, setIsSubtenant] = useState<string>('no');
	// const [sawWildlife, setSawWildlife] = useState<string>('no');

	const [files, setFiles] = useState([]);
	const [fileError, setFileError] = useState<string>();

	const handleActivitiesChange = (event: SelectChangeEvent) => {
		setActivities(event.target.value as string);
		setActivityError('');
	};

	const handleTenuresChange = (event: SelectChangeEvent) => {
		setTenures(event.target.value as string);
		setTenureError('');
	};

	// const handlePermitsChange = (event: SelectChangeEvent) => {
	// 	setPermits(event.target.value as string);
	// };

	const handleModeChange = (event: SelectChangeEvent) => {
		setMode(event.target.value as string);
		setModeError('');
	};

	// const handleIsSubTenantChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setIsSubtenant((event.target as HTMLInputElement).value);
	// };

	// const handleSawWildlifeChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setSawWildlife((event.target as HTMLInputElement).value);
	// };

	const filesControl = () => {
		if (files.length > 0) {
			return (
				files.map((file, index) => (
					<Grid key={index} container direction='row' style={{backgroundColor: 'rgba(134, 142, 150, 0.05)', padding: 7}}>
						<Grid item>
							<IconButton disabled>
								<CheckCircleOutlineOutlinedIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<Typography align='left' variant='body1'>
								{file.name}
							</Typography>
							<Typography align='left' variant='body2'>
								{Number.parseFloat((file.size / Math.pow(1024, 2)).toFixed(2))} MB
							</Typography>
						</Grid>
						<div style={{flex: '1 0 0'}} />
						<Grid item>
							<IconButton onClick={() => handleFileRemove(index)}>
								<DeleteOutlineOutlinedIcon />
							</IconButton>
						</Grid>
					</Grid>
				)));
		} else {
			return (<FileSubmissionDrop setFiles={setUploadFiles}/>);
		}
	}

	const handleFileRemove = () => {
		setFiles([]);
	};

	const setUploadFiles = useCallback((files) => {
		if(files[0].type === '' && files[0].name.includes('.gpx')) {
			setFileError('');
		}
		setFiles(files);
	}, [files]);

	const doUpload = () => {
		const data = {};

		// Shallow Validations before we upload @todo, replace this with an actual validation library
		if (permits !== null && permits !== '') {
			data['permit'] = permits;
		} else if (tenures !== null && tenures !== '') {
			data['tenure'] = tenures;
		}

		// if(!permits || permits === '') {
		// 	setPermitError('Please input a valid Permit')
		// }
		if(!activities || activities === '') {
			setActivityError('Please input a valid Activity');
			return;
		}

		if(!tenures || tenures === '') {
			setTenureError('Please input a valid Tenure');
			return;
		}

		if(!mode || mode === '') {
			setModeError('Please input a valid Mode of Transportation');
			return;
		}

		if(!files.length) {
			setFileError('No file was attached, please attach a valid GPX file.');
			return;
		} else if(files[0].type !== '' && !files[0].name.includes('.gpx')) {
			setFileError('Invalid file type. Please upload a GPX file.');
			return;
		}

		dispatch({
			type: TRAVEL_PATH_UPLOAD_REQUEST, payload: {
				files,
				metadata: {
					modeOfTransport: mode,
					...data
				}
			}
		});

		handleClose();
	};

	// useList(PermitActions, 'operator');
	// const fetchPermitData = () => {
	// 	const permits = useSelector(state => {return state.Permits.items});
	// 	return permits;
	// }

	useList(TenureActions, 'operator');
	const fetchTenureData = () => {
		const tenures = useSelector(state => {return state.Tenures.items});
		return tenures;
	}

	const renderActivitiesOptions = referenceActivities.activities.map((item, index) => { return <MenuItem key={index} value={item}>{item}</MenuItem> });
	const renderTenureOptions =	fetchTenureData().map((item, index) => { return <MenuItem key={index} value={item.id}>{item.reference}</MenuItem> });
	// const renderPermitOptions = fetchPermitData().map((item, index) => { return <MenuItem key={index} value={item.reference}>{item.reference}</MenuItem> });
	const renderModesOfTransportOptions = referenceModes.modes.map((item, index) => { return <MenuItem key={index} value={item}>{item}</MenuItem> });


	return (
		<Dialog open={open} onClose={handleClose}>
			<FormControl fullWidth style={{marginBottom: 20}}>
				<DialogTitle>Add a Trip Report</DialogTitle>
				<DialogContent>
					<DialogContentText style={{marginBottom: 20}}>
                        Enter the required fields and associated files below to add a new trip report.
                        (some items will be available in the near future)
					</DialogContentText>
					<FormControl fullWidth style={{marginBottom: 20}}>
						<InputLabel>Activities</InputLabel> 
						<Select
							value={activities}
							label="Activity"
							onChange={handleActivitiesChange}
							variant='outlined'
							required
						>
							{renderActivitiesOptions}
						</Select>
						<FormHelperText color='error' style={{margin: 0, padding: 0, color: '#f44336'}}>{activityError}</FormHelperText>
					</FormControl>
					<FormControl fullWidth style={{marginBottom: 20}}>
						<InputLabel>Tenures</InputLabel>
						<Select
							value={tenures}
							label="Tenures"
							onChange={handleTenuresChange}
							variant='outlined'
						>
							{renderTenureOptions}
						</Select>
						<FormHelperText color='error' style={{margin: 0, padding: 0, color: '#f44336'}}>{tenureError}</FormHelperText>
					</FormControl>
					{/* <FormControl fullWidth style={{marginBottom: 20}}>
						<InputLabel>Permits</InputLabel> 
						<Select
							value={permits}
							label="Permits"
							onChange={handlePermitsChange}
							variant='outlined'
							disabled // DB doesn't support it at the moment
						>
							{renderPermitOptions}
						</Select>
						<FormHelperText color='error' style={{margin: 0, padding: 0, color: '#f44336'}}>{permitError}</FormHelperText>
					</FormControl> */}
					<FormControl fullWidth style={{marginBottom: 20}}>
						<InputLabel>Transportation Mode</InputLabel> 
						<Select
							value={mode}
							label="Transportation Mode"
							onChange={handleModeChange}
							variant='outlined'
							required
						>
							{renderModesOfTransportOptions}
						</Select>
						<FormHelperText color='error' style={{margin: 0, padding: 0, color: '#f44336'}}>{modeError}</FormHelperText>
					</FormControl>

					{/* {tenures.length && permits.length < 1 ? (
						<FormControl style={{marginBottom: 10}} disabled>
							<FormLabel>Are you a sub-tenant of the reported tenures?</FormLabel>
							<RadioGroup row name="controlled-radio-buttons-group" value={isSubtenant} onChange={handleIsSubTenantChange}>
								<FormControlLabel value="yes" control={<Radio />} label="Yes" />
								<FormControlLabel value="no" control={<Radio />} label="No" />
							</RadioGroup>
						</FormControl>) : null} */}
										
										
					<FormControl style={{marginBottom: 20}}>
						<FormLabel>Attach GPX file(s)</FormLabel>
						<FormHelperText style={{margin: 0}}>A new travel path will be added to each GPX file. You may include multiple related GPX files in one trip report.</FormHelperText>
						{filesControl()}
						<FormHelperText color='error' style={{margin: 0, padding: 0, color: '#f44336'}}>{fileError}</FormHelperText>
					</FormControl>
										
					{/* {tenures.length && permits.length < 1 ? (
						<FormControl disabled>
							<FormLabel>Did you see any wildlife?</FormLabel>
							<RadioGroup row name="controlled-radio-buttons-group" value={sawWildlife} onChange={handleSawWildlifeChange}>
								<FormControlLabel value="yes" control={<Radio />} label="Yes" />
								<FormControlLabel value="no" control={<Radio />} label="No" />
							</RadioGroup>
						</FormControl>
					) : null} */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={doUpload}>Apply</Button>
				</DialogActions>
			</FormControl>
		</Dialog>
	)
}

export default CreateTripReportDialog;
