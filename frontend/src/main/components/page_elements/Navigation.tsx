import React, {useEffect, useState} from 'react';
import '../../styles/nav.scss'
import {Link} from 'react-router-dom';
import {useSelector} from "../../../state/utilities/use_selector";
import {userHasAnyRole} from "../../../state/utilities/authentication_helper";
import {nav} from "../../../state/utilities/nav";
import {useLocation} from "react-router";
import { styled,Paper ,Grid ,Button, Typography } from '@mui/material/';

const Navigation = () => {

	const location = useLocation();

	const currentUserRoles = useSelector(state => state.Auth.roles);

	const navs = [
		nav('/admin/reporting_periods/list', 'Reporting Periods', ['admin']),
		nav('/admin/reports/list', 'Track Observation Reports', ['admin']),
		nav('/admin/organizations/list', 'Commercial Operators', ['admin']),
		nav('/admin/officers/list', 'Conservation Officers', ['admin']),
		nav('/admin/onboarding/list', 'User Onboarding Requests', ['admin']),
		nav('/admin/pinpicker', 'Pin Picker Demo', ['admin']),

		nav('/license_auth_officer/reports/list', 'Travel Path Reports', ['license_auth_officer']),
		nav('/license_auth_officer/tenures/list', 'Tenure Assignments', ['license_auth_officer']),

		nav('/area_admin/reports/list', 'Travel Path Reports', ['area_admin']),
		nav('/area_admin/permits/list', 'Park Permit Assignments', ['area_admin']),

		nav('/operator/profile', 'Profile', ['commercial_operator']),
		nav('/operator/activities/list', 'Travel Path Reports', ['commercial_operator']),
		// nav('/operator/reports/list', 'Travel Path Reports', ['commercial_operator']),

		nav('/officer/activities/list', 'Activities', ['conservation_officer']),
		nav('/officer/reports/list', 'Track Observation Reports', ['conservation_officer']),

	];

	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		textAlign: 'center',
		width: '100%',
		height: '100%',
	}));

	const NavigationButton = styled(Button)(({ theme }) => ({
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		color: '#003366',
		fontSize: '14px',
		textTransform: 'none',
		'&:hover': {backgroundColor: 'rgba(134, 142, 150, 0.05)'}
	}));

	const [activeLink, setActiveLink] = useState(null);
	const [activeNav, setActiveNav] = useState(null);
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
											<Link key={i} to={n.path}onClick={() => setActiveNav(n.path)}>
												<NavigationButton fullWidth  style={{backgroundColor: activeLink === n.path ? 'rgba(0, 51, 102, 0.05)' : null}}>
													<Typography align='left' style={{color: activeLink === n.path ? '#003366' : '#868e96'}} >{n.name}</Typography>
												</NavigationButton>
											</Link>
											{/*<Link to={n.path} className={activeLink === n.path ? 'active' : ''}>
												{n.name}
											</Link>*/}
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
