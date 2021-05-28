import React, {useEffect, useState} from 'react';
import '../styles/nav.scss'
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {userHasAnyRole} from "../../state/utilities/authentication_helper";

const Navigation = () => {

  const history = useHistory();
  const currentUserRoles = useSelector(state => state.Auth.roles);

  const nav = (path, name, roles) => ({
    path,
    name,
    roles,
  });

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

  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <nav className={'sideNav'}>
      <ul>
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
      </ul>
    </nav>
  );
}

export default Navigation;
