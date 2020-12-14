import React from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => (
  <header id="header" className={ 'header' }>
    <div className={ 'container' }>
      <Link to="/" className={ 'home-link' }>
        <img className="home-link__image" src="/images/gov3_bc_logo.png" width={155} height={52} alt={'BC Government Logo'} id="logo"/>
        <span className="home-link__title">Tracks</span>
      </Link>
    </div>
  </header>
);

export default Header;

