import React from 'react';
import {Link} from "react-router-dom";
import RoleSelector from "./RoleSelector";
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import CONFIG from '../../config';
import "../styles/header.scss";

const Header = () => {

  const bestName = useSelector(state => state.Auth.bestName);

  return (
    <header id="header" className={'header'}>
      <div className={'container'}>
        <Link to="/" className={'home-link'}>
          <img className="home-link__image" src="/images/gov3_bc_logo.png" width={155} height={52}
              alt={'BC Government Logo'} id="logo" />
          <span className="home-link__title">Tracks</span>
        </Link>
        <nav className="profile-nav">
        <li className={'role-selector'}>
          <RoleSelector />
        </li>
        <li className={'username'}>
          {CONFIG.DEVELOPMENT_MODE}
          {bestName}
        </li>
        <li>
          <Button className={'log-out'} color="primary"
            // onClick={() => authContext.keycloakInstance.logout()}
          >
            Log out
          </Button>
        </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
