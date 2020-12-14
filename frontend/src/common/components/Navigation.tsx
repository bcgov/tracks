import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { KeycloakContext } from './AuthRequired';
import "./Navigation.scss";

const Navigation = (props) => {
  const { history } = props;
  const keycloak = useContext(KeycloakContext);

  const nav = (path, name) => ({
    path,
    name,
  });


  const navs = [
    nav('/operator/home', 'Commercial Recreation Operator Home'),
    nav('/admin/home', 'Administration Home'),
    nav('/conservation_officer/home', 'Conservation Officer Home'),
    nav('/map', 'Leaflet Demo'),
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
    <nav className={'main-nav'}>
      <div className={ 'container' }>
        <ul>
          <li>
            <Link to="/operator/home">
              Operators
            </Link>
          </li>
          <li>
            <Link to="/conservation_officer/home">
              Conservation Officers
            </Link>
          </li>
          <li>
            <Link to="/map">
              Map
            </Link>
          </li>
        </ul>
      </div>

      {/* <ul>
        {navs.map((n) => (
          <li key={n.name}>
            <button
              className={activeLink === n.path ? 'active' : ''}
              onClick={() => history.push(n.path)}
              disabled={activeLink === n.path}
            >
              {n.name}
            </button>
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
      </ul> */}

    </nav>
  );
}

export default withRouter(Navigation);
