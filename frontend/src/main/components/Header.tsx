import React from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import Icon from '@mdi/react'
import {mdiAccountCircle} from '@mdi/js'
import "../styles/header.scss";
import {keycloakInstance} from "../../state/sagas/auth";

const Header = () => {

  const bestName = useSelector(state => state.Auth.bestName);

  return (
    <header id="header" className={'header'}>
      <div className={'container'}>
        <Link to="/" className={'homeLink'}>
          <img src="/images/gov3_bc_logo.png" width={155} height={52}
               alt={'BC Government Logo'} id="logo" />
          Tracks
        </Link>
        <nav className="profile">
          <li>
            <div className={'username'}>
              <Icon path={mdiAccountCircle}
                    title="User Profile"
                    size={1}>
              </Icon>
              <span>
              {bestName}
            </span>
            </div>
          </li>
          <li>
            {/*@todo dispatch this*/}
            <Button className={'logout'} color="primary"
                    onClick={() => keycloakInstance.logout()}
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
