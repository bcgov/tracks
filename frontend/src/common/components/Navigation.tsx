import React, {useEffect, useState} from 'react';
import '../styles/nav.scss'
import {Link, useHistory} from 'react-router-dom';
import RoleSelector from "./RoleSelector";
import {useSelector} from 'react-redux';
import CONFIG from '../../config';
import {userHasAnyRole} from "../../state/utilities/authentication_helper";

const Navigation = () => {

  const history = useHistory();
  const currentUserRoles = useSelector(state => state.Auth.roles);
  const bestName = useSelector(state => state.Auth.bestName);

  const nav = (path, name, roles) => ({
    path,
    name,
    roles,
  });

  const navs = [
    nav('/', 'Home', []),

    nav('/admin/reports/list', 'Track Observation Reports', ['admin']),
    nav('/admin/organizations/list', 'Commercial Operators', ['admin']),
    nav('/admin/officers/list', 'Conservation Officers', ['admin']),

    nav('/license_auth_officer/reports/list', 'Travel Path Reports', ['license_auth_officer']),
    nav('/license_auth_officer/tenures/list', 'Tenures', ['license_auth_officer']),

    nav('/area_admin/reports/list', 'Travel Path Reports', ['area_admin']),
    nav('/area_admin/permits/list', 'Park Permits', ['area_admin']),

    nav('/operator/travel_paths/list', 'Travel Paths', ['commercial_operator']),
    nav('/operator/reports/list', 'Travel Path Reports', ['commercial_operator']),
    nav('/operator/permits/list', 'My Park Permits', ['commercial_operator']),
    nav('/operator/tenures/list', 'My Tenures', ['commercial_operator']),

    nav('/officer/travel_paths/list', 'My Travel Paths', ['conservation_officer']),
    nav('/officer/reports/list', 'Track Observation Reports', ['conservation_officer']),

  ];

  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <nav>
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

        <li className={'filler'} />
        {CONFIG.DEVELOPMENT_MODE && <li className={'right'}>
          <RoleSelector />
        </li>}
        <li className={'right'}>
          <button
            // onClick={() => authContext.keycloakInstance.logout()}
          >
            {`Logout ${bestName}`}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
