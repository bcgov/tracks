import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import {useSelector} from "react-redux";
import { getAuthHeaders } from "../../state/utilities/authentication_helper";
import { getConfiguration } from "../../state/utilities/config_helper";

class TenureDialogProps {
	open: boolean;
	handleClose: () => void;
}

const CreateTenureDialog = ({open, handleClose}: TenureDialogProps) => {

	const dispatch = useDispatch();
	const [tenureReferenceData, setTenureReferenceData] = useState([]);
	const [tenures, setTenures] = useState<string>('');

	const headers = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	const handleUpdate = (event) => {
		setTenures(event.target.value as string)
	}

	const doSubmit = () => {
		// @todo we don't have a route to store tenures at the moment.
		handleClose();
	};

	const fetchTenuresFromTTLS = async () => {
		try {
			await axios.get(`${configuration.API_BASE}/api/v1/ttls/tenures`, {
				headers
			}
			).then(response => {
				if(response) {
					setTenureReferenceData(response.data);
				}
			});
		}
		catch (err) {
			return;
		}
	}

	useEffect(() => {
		fetchTenuresFromTTLS();
	}, [])

	const tenureSelectOptions = tenureReferenceData.map((item, index) => {
		return <MenuItem key={index} value={item.id}>{item.fileNumber}</MenuItem>
	});

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
			<DialogTitle id="form-dialog-title">Add A Tenure</DialogTitle>
			<DialogContent>
				<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
					<FormControl>
						<InputLabel>Tenure ID</InputLabel>
						<Select
							value={tenures}
							label='Tenures'
							onChange={handleUpdate}
							variant='outlined'
							required
						>
							{tenureSelectOptions}
						</Select>
					</FormControl>
				</Box>

			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={doSubmit} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CreateTenureDialog;
