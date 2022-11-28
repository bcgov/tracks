import React from 'react';
import TenureList from "./components/TenureList";
import TenureBindingRequests from "./components/TenureBindingRequests";
import CreateTenureBindingRequest from "./components/CreateTenureBindingRequest";

const TenuresManagement = () => {


	return (
		<>
			<>
				<h2>Organization Tenures</h2>

				<TenureList/>

				<hr/>

				<TenureBindingRequests/>

				<hr/>

				<CreateTenureBindingRequest/>
			</>
		</>
	);
};


export default TenuresManagement;
