import React, { useState } from 'react';
import { useSelector } from '../../../../state/utilities/use_selector'

import { Typography, IconButton, Avatar, Paper, Grid, styled, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit } from '@mui/icons-material';

const PermitList = () => {
	const [open, setOpen] = useState(false);
	const handleOpen  = () => setOpen(true);
	const handleClose = () => setOpen(false); //temporarily set to false

	const handleApply = () => {
		setOpen(false);
	}

	// MUI Styling (custom styled components)
	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		padding: theme.spacing(1),
		height: '50vh',
		width: '100%',
		color: theme.palette.text.primary,
	}));

	const ProfileAvatar = styled(Avatar)({
		height: 175,
		width: 175,
	});

	const userData = useSelector(state => {
		// deconstruct from state then populate the data structure
		const { email, name, organization, roles } = state.UserInfo;
		const data = {
			organization: {
				organizationName: organization
			},
			personal: {
				name: name || 'N/A',
				email: email || 'N/A',
				altEmail: 'N/A',
				roles: roles || ['N/A'],
			}
		}

		// if there actually is data there, remove loading state so content can show
		if(data) {
			return data;
		} else {
			return null;
		}
	});

	return (
		<>
			<Typography variant='h5' gutterBottom={true}>Profile</Typography> <br />
			<Grid container spacing={2} alignItems='center'>
				<Grid item xs={3}>
					<Typography variant='subtitle2'>
						Personal
					</Typography>
					<Item style={{padding: 15}}>
						<Grid container justifyContent='right' direction='row'>
							<IconButton style={{color: 'black'}} aria-label="edit profile" component="label" onClick={handleOpen}>
								<Edit />
							</IconButton>
							<Dialog open={open} onClose={handleClose} maxWidth='xs'>
								<DialogTitle>Edit Personal Profile Information</DialogTitle>
								<DialogContent>
									<DialogContentText>
										Edit your profile information using the fields below and click the 'Apply' button to apply your changes.
									</DialogContentText>
									<br />
									<TextField
										autoFocus
										margin="normal"
										id="name"
										label="Name"
										type="name"
										fullWidth
										variant="outlined"
										value={userData.personal.name}
										disabled
									/>
									<TextField
										margin="normal"
										id="email"
										label="Email Address"
										type="email"
										fullWidth
										variant="outlined"
										value={userData.personal.email}
										disabled
									/>
									<TextField
										margin="normal"
										id="altEmail"
										label="Alternate Email Address"
										type="altEmail"
										fullWidth
										variant="outlined"
										disabled
									/>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose}>Cancel</Button>
									<Button onClick={handleApply} disabled>Apply</Button>
								</DialogActions>
							</Dialog>
						</Grid>
						<Grid container alignItems='center' direction='column'>
							<ProfileAvatar />
						</Grid>
						<br /> <br />
						<Grid container alignItems='center' direction='column'>
							<Grid item xs={2}>
								<Typography variant='h6' gutterBottom align='center'>{userData.personal.name}</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography gutterBottom align='center'>{userData.personal.roles.map(r => r.friendlyName).join(', ')}</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography gutterBottom align='center'>{userData.personal.email}</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography gutterBottom align='center'>{userData.personal.altEmail}</Typography>
							</Grid>
						</Grid>
					</Item>
				</Grid>
				<Grid item xs={8}>
					<Typography variant='subtitle2'>
						Organization
					</Typography>
					<Item style={{padding: 35}}>
						<Grid container alignItems='left' direction='column' spacing={6}>
							<Grid item xs={4}>
								<Typography variant='h5' gutterBottom align='left'>{userData.organization.organizationName}</Typography>
								{/*<Typography gutterBottom align='left' variant='subtitle2'>Email Address | Phone Number</Typography>*/}
							</Grid>
							{/*<Grid item xs={2}>
								<Typography align='left'>Activities</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>No data was found.</Typography> <br />
							</Grid> */}
							<Grid item xs={4}>
								<Typography align='left'>Land Act Tenures</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>Coming soon.</Typography> <br />
							</Grid>
							<Grid item xs={4}>
								<Typography align='left'>BC Park Use Permits</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>Coming soon.</Typography> <br />
							</Grid>
						</Grid>
					</Item>
				</Grid>
			</Grid>
		</>
	);
};

export default PermitList;
