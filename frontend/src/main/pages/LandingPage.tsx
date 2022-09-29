import React from 'react';
import {connect} from 'react-redux';

const LandingPage = (props) => {
	const {bestName} = props;

	return (
		<div>
			<h1>Welcome to Tracks, {bestName}</h1>
		</div>
	)

};

const mapStateToProps = (state) => {

	const mappedProps = {
		currentUserRoles: state.Auth.roles,
		bestName: state.Auth.bestName,
	};
	return mappedProps;
}


export default connect(mapStateToProps, null)(LandingPage);
