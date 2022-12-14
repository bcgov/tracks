import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	TextField,
	Typography,
	Grid
} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import { getAuthHeaders } from "../../state/utilities/authentication_helper";
import { getConfiguration } from "../../state/utilities/config_helper";
import { useDispatch } from "react-redux";

class TenureDialogProps {
	open: boolean;
	handleClose: () => void;
}

class AdminTenureDialogProps {
	open: boolean;
	handleClose: () => void;
	organizationName: string;
	organizationID: string;
}

class TenureInfo {
	id: number;
	fileNumber: string;
	purposeCode: string;
	stageCode: string;
	landUseTypeCode: string;
	statusCode: string;
	locationDescription: string;
	parcels: Array<string>;
	organizations: Array<string>;
}

const CreateTenureDialog = ({open, handleClose}: TenureDialogProps) => {

	const [tenureReferenceData, setTenureReferenceData] = useState([]);
	const [tenures, setTenures] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const headers = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);
	const dispatch = useDispatch();

	const handleUpdate = (event) => {
		setTenures(event.target.value as string)
	};

	const doSubmit = () => {
		setLoading(true);

		if(!tenures.length) {
			setErrorMessage('Please enter a valid file number.');
			setLoading(false);
			return;
		}

		const Uri = `${configuration.API_BASE}/api/v1/operator/tenure_bindings`;
		const payload = { reference: tenures };
		
		if(tenureReferenceData.some(item => { return item.fullTenure.fileNumber === tenures})) {
			axios
				.post(Uri, payload, { headers: headers }).then(() => {
					console.log('using operator route')
					dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'operator'}});
					
					handleClose();
					setErrorMessage('');
					setLoading(false); 
				})
				.catch(() => {
					setErrorMessage('Unable to submit a tenure. Please try again later.')
					setLoading(false);
				});
		} else {
			setErrorMessage('Unable to find that file number. Please try again.');
			setLoading(false);
		}
	};

	const fetchTenuresFromTTLS = async () => {
		const options = {headers}
		const Uri = `${configuration.API_BASE}/api/v1/ttls/tenures`;
		const data = [];
		try {
			await axios.get(Uri, options
			).then(response => {
				if(response) {
					response.data.map((item) => {
						data.push({
							label: item.fileNumber,
							value: item.id,
							fullTenure: item
						})
					})
					setTenureReferenceData(data);
				}
			});
		}
		catch (err) {
			setErrorMessage('Unable communicate with TTLS. Please try again later.')
			return;
		}
	};

	useEffect(() => {
		fetchTenuresFromTTLS();
	}, [])

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
			<DialogTitle id="form-dialog-title">Add A Tenure</DialogTitle>
			
			<DialogContent>
				<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
					<FormControl>
						<Typography variant='body2' color='error' style={{marginBottom: 10}}>{errorMessage}</Typography>
						<TextField
							style={{paddingLeft: 0}}
							value={tenures}
							label='Tenure'
							placeholder="Please put the file number of your desired Tenure."
							onChange={handleUpdate}
							variant='outlined'
							fullWidth
							autoFocus
							disabled={tenureReferenceData.length > 0 ? false : true}
						/>
					</FormControl>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={doSubmit} color="primary" disabled={loading ? true : false}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const CreateAdminTenureDialog = ({open, handleClose, organizationName, organizationID}: AdminTenureDialogProps) => {
	const [tenureReferenceData, setTenureReferenceData] = useState([]);
	const [tenures, setTenures] = useState<string>('');
	const [tenureInfo, setTenureInfo] = useState<TenureInfo>();
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const headers = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);
	const dispatch = useDispatch();

	const handleUpdate = (event) => {
		setTenures(event.target.value as string)
	};
	const doSubmit = () => {
		setLoading(true);

		if(!tenures.length) {
			setErrorMessage('Please enter a valid file number.');
			setLoading(false);
			return;
		}

		const Uri = `${configuration.API_BASE}/api/v1/admin/tenure_bindings/${organizationID}`;
		const payload = { reference: tenures };
		
		if(tenureReferenceData.some(item => { return item.fullTenure.fileNumber === tenures})) {
			axios
				.post(Uri, payload, { headers: headers }).then(() => {
					console.log('using admin route')
					dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'admin'}});
					handleClose();
					setErrorMessage('');
					setLoading(false); 
				})
				.catch(() => {
					setErrorMessage('Unable to submit a tenure. Please try again later.')
					setLoading(false);
				});
		} else {
			setErrorMessage('Unable to find that file number. Please try again.');
			setLoading(false);
		}
	};
	const doSearch = () => {
		let tenure: TenureInfo;

		for(let i = 0; i < tenureReferenceData.length; i++ ) {
			if (tenureReferenceData[i].label === tenures) {
				tenure = {
					id: tenureReferenceData[i].fullTenure.id,
					fileNumber: tenureReferenceData[i].fullTenure.fileNumber,
					purposeCode: tenureReferenceData[i].fullTenure.purposeCode,
					stageCode: tenureReferenceData[i].fullTenure.stageCode,
					landUseTypeCode: tenureReferenceData[i].fullTenure.landUseTypeCode,
					statusCode: tenureReferenceData[i].fullTenure.statusCode,
					locationDescription: tenureReferenceData[i].fullTenure.locationDescription,
					parcels: tenureReferenceData[i].fullTenure.parcels,
					organizations: tenureReferenceData[i].fullTenure.organizations
				}
				setTenureInfo(tenure);
			}
		}	
	}
	const fetchTenuresFromTTLS = async () => {
		const options = {headers}
		const Uri = `${configuration.API_BASE}/api/v1/ttls/tenures`;
		const data = [];
		try {
			await axios.get(Uri, options
			).then(response => {
				if(response) {
					response.data.map((item) => {
						data.push({
							label: item.fileNumber,
							value: item.id,
							fullTenure: item
						})
					})
					setTenureReferenceData(data);
				}
			});
		}
		catch (err) {
			setErrorMessage('Unable communicate with TTLS. Please try again later.')
			return;
		}
	};

	useEffect(() => {
		fetchTenuresFromTTLS();
	}, []);

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
			<DialogTitle id="form-dialog-title">Add A Tenure (Administrator Mode)</DialogTitle>
			
			<DialogContent>
				<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
					<FormHelperText style={{margin: 0, padding: 0}}>Adding the tenure for: {organizationName}</FormHelperText>
					<FormControl>
						<Typography variant='body2' color='error' style={{marginBottom: 10}}>{errorMessage}</Typography>
						<TextField
							style={{paddingLeft: 0}}
							value={tenures}
							label='Tenure'
							placeholder="Please put the file number of your desired Tenure."
							onChange={handleUpdate}
							variant='outlined'
							fullWidth
							disabled={tenureReferenceData.length > 0 ? false : true}
							focused
						/>
						<Button onClick={doSearch} variant='text' disableRipple>
							Search
						</Button>
					</FormControl>
				</Box>
				{
					tenureInfo ? (
						<Box style={{paddingTop: 15, paddingRight: 5, paddingLeft: 5}}>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									ID: {tenureInfo.id}
								</Grid>
								<Grid item xs={4}>
									File Number: {tenureInfo.fileNumber}
								</Grid>
								<Grid item xs={4}>
									Purpose Code: {tenureInfo.purposeCode}
								</Grid>
								<Grid item xs={4}>
									Stage Code: {tenureInfo.stageCode}
								</Grid>
								<Grid item xs={4}>
									Land Use Code: {tenureInfo.landUseTypeCode}
								</Grid>
								<Grid item xs={4}>
									Status: {tenureInfo.statusCode}
								</Grid>
								<Grid item xs={4}>
									Location Description: {tenureInfo.locationDescription}
								</Grid>
								<Grid item xs={4}>
									Parcels: {tenureInfo.parcels}
								</Grid>
								<Grid item xs={4}>
									Organizations: {tenureInfo.organizations}
								</Grid>
							</Grid>
						</Box>
					) : null
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={doSubmit} color="primary" disabled={loading ? true : false}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export {CreateTenureDialog, CreateAdminTenureDialog};
