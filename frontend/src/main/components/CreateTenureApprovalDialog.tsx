import React, { useEffect, useState } from 'react';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField,
	Typography
} from '@mui/material';

import axios from 'axios';
import { useSelector } from 'react-redux';


class TenureApprovalDialogProps {
	open: boolean;
	handleClose: () => void;
}

const CreateTenureDialog = ({open, handleClose}: TenureApprovalDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleUpdate = (event) => {

	}

	const doSubmit = () => {
		setLoading(true);
		const Uri = `${configuration.API_BASE}/api/v1/operator/tenures`;
		const options = {

		}

	}

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
			<DialogTitle>Approve Tenure</DialogTitle>
			<DialogContent>
				<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
					<FormControl>
						<Typography variant='body2' color='error' style={{marginBottom: 10}}>{errorMessage}</Typography>
					</FormControl>       
				</Box>
			</DialogContent>
		</Dialog>
	)
}
