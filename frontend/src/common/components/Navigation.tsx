import React, {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";
import {KeycloakContext} from './AuthRequired';
import "../styles/nav.scss";

const Navigation = (props) => {
  const {history} = props;
  const keycloak = useContext(KeycloakContext);

  const nav = (path, name) => ({
    path,
    name,
  });

  const navs = [
    nav('/operator/home', 'Operators'),
    nav('/conservation_officer/home', 'Conservation Officers'),
    nav('/admin/home', 'Administration'),
    nav('/map', 'Map'),
  ];


  const bestName = () => {
    const preferenceOrder = ['name', 'preferred_username', 'given_name', 'sub'];

    for (const p of preferenceOrder) {
      if ((p in keycloak.idTokenParsed) &&
        (keycloak.idTokenParsed[p] !== null) &&
        (keycloak.idTokenParsed[p].length > 0)) {
        return keycloak.idTokenParsed[p];
      }
    }

    return 'User';
  };

  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <nav>
        <ul>
          {navs.map((n) => (
            <li key={n.name}>
              <Link to={n.path} className={activeLink === n.path ? 'active' : ''}>
                {n.name}
              </Link>
            </li>
          ))}
          <li className={'filler'} />
          <li className={'right'}>
            <button
              onClick={() => keycloak.logout()}
            >
              Logout {bestName()}
            </button>
          </li>
        </ul>
    </nav>
  );
}

export default withRouter(Navigation);
