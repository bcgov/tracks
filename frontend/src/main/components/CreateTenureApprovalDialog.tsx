import React, { useEffect, useState } from 'react';
import {getConfiguration} from "../../state/utilities/config_helper";

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	TextField,
	Typography
} from '@mui/material';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

class TenureApprovalDialogProps {
	open: boolean;
	handleClose: () => void;
	id: string;
}

const CreateTenureApprovalDialog = ({open, handleClose, id}: TenureApprovalDialogProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [reason, setReason] = useState<string>('');
	
	const dispatch = useDispatch();
	const authHeaders = useSelector(state => state.Auth.headers);
	const configuration = useSelector(getConfiguration);

	const handleUpdate = (event) => {
		setReason(event.target.value as string);
	};

	const doSubmit = (id, payload) => {
		setLoading(true);

		axios.post(`${configuration.API_BASE}/api/v1/admin/tenure_bindings`,
			{
				...payload,
				id
			},
			{
				headers: authHeaders,
			}).then(() => {
			dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'admin'}});
			setLoading(false);
			handleClose();
		}).catch((() => {
			dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'admin'}});
			setLoading(false);
			handleClose();
		}));
	}

	const doReject = (id, reason) => {
		doSubmit(id, {action: 'REJECT', reason});
	}

	const doAccept = (id) => {
		doSubmit(id, {action: 'ACCEPT'})
	}

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
			<DialogTitle>Approve Tenure</DialogTitle>
			<DialogContent>
				<DialogContentText>Approvals do not require a reason and will not be saved with a reason.</DialogContentText>	
				<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
					<FormControl>
						<Typography variant='body2' color='error' style={{marginBottom: 10}}>{errorMessage}</Typography>
						<TextField 
							style={{paddingLeft: 0}}
							label='Reason'
							onChange={handleUpdate}
							variant='outlined'
							fullWidth
							autoFocus
							placeholder='Please put a reason for your request.'
						/>
					</FormControl>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button variant='contained' color='error' onClick={() => doReject(id,reason)}>Reject</Button>
						<Button variant='contained' color='primary' onClick={() => doAccept(id)}>Approve</Button>
					</DialogActions>       
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTenureApprovalDialog;