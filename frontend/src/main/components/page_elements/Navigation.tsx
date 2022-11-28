import React, {useEffect, useState} from 'react';
import '../../styles/nav.scss'
import {Link} from 'react-router-dom';
import {useSelector} from "../../../state/utilities/use_selector";
import {userHasAnyRole} from "../../../state/utilities/authentication_helper";
import {nav} from "../../../state/utilities/nav";
import {useLocation} from "react-router";
import { styled,Paper ,Grid ,Button, Typography } from '@mui/material/';

//nav icons. don't import these modularly, scary stuff happens
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';

import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';

import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Navigation = () => {
	const [activeLink, setActiveLink] = useState(null);

	const location = useLocation();
	const currentUserRoles = useSelector(state => state.Auth.roles);

	const navs = [
		nav('/admin/reporting_periods/list', 'Reporting Periods', ['admin']),
		nav('/admin/reports/list', 'Track Observation Reports', ['admin']),
		nav('/admin/organizations/list', 'Commercial Operators', ['admin']),
		nav('/admin/officers/list', 'Conservation Officers', ['admin']),
		nav('/admin/onboarding/list', 'User Onboarding Requests', ['admin']),
		nav('/admin/pinpicker', 'Pin Picker Demo', ['admin']),
		nav('/admin/tantalis', 'Tantalis Integration Demo', ['admin']),
		nav('/admin/tenure_binding_requests', 'Tenure Binding Requests', ['admin']),

		nav('/license_auth_officer/reports/list', 'Travel Path Reports', ['license_auth_officer'], <ConnectingAirportsOutlinedIcon />),
		nav('/license_auth_officer/tenures/list', 'Tenure Assignments', ['license_auth_officer'], <AssignmentOutlinedIcon />),

		nav('/area_admin/reports/list', 'Travel Path Reports', ['area_admin'], <AirplanemodeActiveOutlinedIcon />),
		nav('/area_admin/permits/list', 'Park Permit Assignments', ['area_admin'], <WorkspacePremiumOutlinedIcon />),

		nav('/operator/profile', 'Profile', ['commercial_operator']),
		nav('/operator/activities/list', 'Travel Path Reports', ['commercial_operator']),
		nav('/operator/tenures', 'My Tenures', ['commercial_operator']),
		nav('/operator/TripReports', 'Trip Reports', ['commercial_operator'], <FlightOutlinedIcon />),

		// nav('/operator/reports/list', 'Travel Path Reports', ['commercial_operator']),

		nav('/officer/activities/list', 'Activities', ['conservation_officer'], <LocalActivityOutlinedIcon />),
		nav('/officer/reports/list', 'Track Observation Reports', ['conservation_officer'], <RemoveRedEyeOutlinedIcon />),

	];
	
	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		width: 'auto',
		height: '100%',
		paddingTop: 15,
		paddingBottom: 15
	}));

	const NavigationButton = styled(Button)(({ theme }) => ({
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		color: '#003366',
		fontSize: '14px',
		paddingLeft: 20,
		textTransform: 'none',
		'&:hover': {backgroundColor: 'rgba(134, 142, 150, 0.05)'}
	}));

	
	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location.pathname]);


	return (
		<nav className={'sideNav'}>
			<Grid container direction={'column'}>
				<Grid item xs={4}>
					<Item>
						<Grid container direction={'column'}>
							{navs.map((n, i) => {
								if (n.roles.length === 0 || (n.roles.length > 0 && userHasAnyRole(currentUserRoles, n.roles))) {
									return (
										<Grid item>
											<Link key={i} to={n.path}>
												<NavigationButton startIcon={n.component} disableRipple fullWidth style={{backgroundColor: activeLink === n.path ? 'rgba(0, 51, 102, 0.05)' : null}}>
													<Typography align='left' style={{color: activeLink === n.path ? '#003366' : '#868e96'}}>{n.name}</Typography>
													<div style={{flex: '1 0 0'}} />
												</NavigationButton>
											</Link>
										</Grid>
									
									);
								} else {
									return null;
								}
							})}
						</Grid>
					</Item>
				</Grid>
			</Grid>
			{/* <ul>
			{navs.map((n, i) => {
				if (n.roles.length === 0 || (n.roles.length > 0 && userHasAnyRole(currentUserRoles, n.roles))) {
					return (
						<li key={i}>
							<Link to={n.path} className={activeLink === n.path ? 'active' : ''}>
								{n.name}
							</Link>
						</li>
					);
				} else {
					return null;
				}
			})}
		</ul>*/}
		</nav>
	);
}

export default Navigation;
