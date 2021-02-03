import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory} from "react-router-dom";
import {userHasAnyRole} from "../../state/utilities/authentication_helper";

import "../styles/nav.scss";
import "../styles/footer.scss";


const Footer = () => {

  const history = useHistory();
  const currentUserRoles = useSelector(state => state.Auth.roles);

  const nav = (path, name, roles) => ({
    path,
    name,
    roles,
  });

  const navs = [
    nav('/', 'Home', []),
    nav('/disclaimer', 'Disclaimer', []),
    nav('/privacy', 'Privacy', []),
    nav('/accessibility', 'Accessibility', []),
    nav('/copyright', 'Copyright', []),
  ];

  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <footer id="footer">
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
        </ul>
      </nav>
    </footer>);

}


export default Footer;
