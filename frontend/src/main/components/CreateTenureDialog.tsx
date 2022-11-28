import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import { getAuthHeaders } from "../../state/utilities/authentication_helper";
import { getConfiguration } from "../../state/utilities/config_helper";

class TenureDialogProps {
	open: boolean;
	handleClose: () => void;
}

const CreateTenureDialog = ({open, handleClose}: TenureDialogProps) => {

	const [tenureReferenceData, setTenureReferenceData] = useState([]);
	const [tenures, setTenures] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const headers = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	const handleUpdate = (event) => {
		setTenures(event.target.value as string)
	}

	const doSubmit = () => {
		// @todo We need to store more info then this. Right now reference actually refers to ID and state/end dates don't exist from TTLS
		setLoading(true);
		if(!tenures.length) {
			setErrorMessage('Please enter a valid file number.');
			return;
		}
		const Uri = `${configuration.API_BASE}/api/v1/operator/tenures`;
		const options = {
			headers,
			reference: tenureReferenceData[0].id,
			start_date: '',
			end_date: ''
		}
		if(tenureReferenceData.some(item => { return item.fileNumber === tenures})) {
			try {
				axios.post(Uri, options).then(response => {
					console.log(response);
					console.log('complete')
					handleClose();
					setErrorMessage('');
					setLoading(false);
				});
			} catch (error) {
				setErrorMessage('Unable to submit a tenure.')
				setLoading(false);
			}
			
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

					console.log(response.data)
				}
			});
		}
		catch (err) {
			setErrorMessage('Unable communicate with TTLS. Please try again later.')
			return;
		}
	}

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

export default CreateTenureDialog;
