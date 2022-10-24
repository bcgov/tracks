import React, { useState, useEffect } from 'react';
import { useSelector } from '../../../../state/utilities/use_selector'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const PermitList = () => {
	// DONE: Create 2 sections for Personal and Organization
	// DONE: Convert existing code to MUI
	// TODO: deconstruct the data to be displayed (do this in two seperate objects, one for personal and one for organization)
	// TODO: Allow user to edit data
	// TODO: Make sure edit data is being changed on the database side

	const [loading, setLoading] = useState(false); //temporarily set to false

	// TODO: Grab the user data
	const userData = useSelector(state => {
		let data: Unknown;
		console.log(state);

		// if there actually is data there, remove loading state so content can show
		if(data) {
			setLoading(false)
		} else {
			return null;
		}
	});

	// MUI Styling (custom styled components)
	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		padding: theme.spacing(1),
		height: '50vh',
		color: theme.palette.text.primary,
	}));

	const ProfileAvatar = styled(Avatar)({
		height: 175,
		width: 175,
	});

	// Only load if data was retrieved successfully
	useEffect(() => {
		console.log('route /profile/ was hit');
	}, [loading])


	return (
		<>
			<Typography variant='h5' gutterBottom={true}>Profile</Typography> <br />
			<Grid container spacing={2} alignItems='center'>
				<Grid item xs={3}>
					<Typography variant='subtitle2'>
						Personal
					</Typography>
					<Item>
						<br />
						<Grid container alignItems='center' direction='column'>
							<ProfileAvatar /> 
						</Grid>
						<br />
						<Typography variant='h6' gutterBottom align='center'>John Smith</Typography> <br />
						<Typography gutterBottom align='center'>jSmith@bcGov.com</Typography>
						<Typography gutterBottom align='center'>jSmith@alternateEmail.com</Typography>
						<Typography gutterBottom align='center'>{useSelector(state => state.Auth.roles[0])}</Typography>
						<Typography gutterBottom align='center'>(604) 355-7189</Typography>
					</Item>
				</Grid>
				<Grid item xs={8}>
					<Typography variant='subtitle2'>
						Organization
					</Typography>
					<Item style={{padding: 35}}>
						<Grid container alignItems='left' direction='column' spacing={4}>
							<Grid item xs={2}>
								<Typography variant='h5' gutterBottom align='left'>Organization Name</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>Email Address | Phone Number</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography align='left'>Activities</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>No data was found.</Typography> <br />
							</Grid>
							<Grid item xs={2}>
								<Typography align='left'>Land Act Tenures</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>No data was found.</Typography> <br />
							</Grid>
							<Grid item xs={2}>
								<Typography align='left'>BC Park Use Permits</Typography>
								<Typography gutterBottom align='left' variant='subtitle2'>No data was found.</Typography> <br />
							</Grid>
						</Grid>
					</Item>
				</Grid>
			</Grid>
		</>
	);
};

export default PermitList;
