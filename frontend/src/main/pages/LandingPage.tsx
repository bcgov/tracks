import React from 'react';
import CONFIG from "../../config";
import {connect} from 'react-redux';

const LandingPage = (props) => {
  const {actingAs, currentUserRoles, bestName} = props;

  const actingAsMessage = () => {
    if (CONFIG.DEVELOPMENT_MODE) {
      return (<p>
        In development mode. Acting as <strong>{actingAs}</strong>
        , with roles
        &nbsp;<strong>[{currentUserRoles.join(', ')}]</strong></p>)
    }
  };

  return (
    <div>
      <h1>Welcome to Tracks, {bestName}</h1>
      {actingAsMessage()}
    </div>
  )

};

const mapStateToProps = (state) => {
  const mappedProps = {
    currentUserRoles: state.Auth.roles,
    bestName: state.Auth.bestName,
  };

  if (CONFIG.DEVELOPMENT_MODE) {
    mappedProps.actingAs = state.Auth.developmentTools.actingAs != null ? state.Auth.developmentTools.actingAs.username : 'Myself';
  }

  return mappedProps;
}


export default connect(mapStateToProps, null)(LandingPage);
