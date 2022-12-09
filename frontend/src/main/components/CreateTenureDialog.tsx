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
} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import { getAuthHeaders } from "../../state/utilities/authentication_helper";
import { getConfiguration } from "../../state/utilities/config_helper";
import { useDispatch } from "react-redux";

class TenureDialogProps {
	open: boolean;
	handleClose: () => void;
	organizationName: string;
	organizationID: string;
	admin: boolean;
}

const CreateTenureDialog = ({open, handleClose, organizationName, organizationID, admin}: TenureDialogProps) => {

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

		const Uri = admin ? `${configuration.API_BASE}/api/v1/admin/tenure_bindings/${organizationID}` : `${configuration.API_BASE}/api/v1/operator/tenure_bindings`;
		const payload = { reference: tenures };
		
		if(tenureReferenceData.some(item => { return item.fullTenure.fileNumber === tenures})) {
			axios
				.post(Uri, payload, { headers: headers }).then(() => {
					if(!admin) {
						console.log('using operator route')
						dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'operator'}});
					} else if(admin) {
						console.log('using admin route')
						dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'admin'}});
					}
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
						{admin ? <FormHelperText style={{margin: 0, padding: 0}}>Adding the tenure for: {organizationName} <br /> ID: {organizationID} </FormHelperText> : null}
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

export default CreateTenureDialog;
