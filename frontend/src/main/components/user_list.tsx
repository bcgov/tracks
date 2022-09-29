import React from "react";
import {TitleBarButtonContainer} from "./util/title";
import {TracksTable} from "./util/tracks_table";
import moment from "moment";


const AccessRequestStatus = ({status}) => {

	switch (status) {
		case 'PENDING':
			return (<span>Pending</span>);
		case 'DENIED':
			return (<span>Denied</span>);
	}
	return null;
};

const accessRequestHeaders = [
	{title: 'Name', filterable: false, accessor: (r) => r.name},
	{title: 'Username', filterable: false, accessor: (r) => r.username},
	{title: 'Role', filterable: false, accessor: (r) => r.role},
	{title: 'Date Submitted', filterable: false, accessor: (r) => r.dateSubmitted, renderer: v => v.format('MM/DD/YY')},
	{title: 'Status', filterable: false, accessor: (r) => r.status, renderer: v => (<AccessRequestStatus status={v}/>)}
];
const accessRequestData = [
	{
		name: 'John Smith',
		username: 'jsmith@IDIR',
		role: 'Authorizations Officer',
		dateSubmitted: moment('2020-03-01'),
		status: 'PENDING'
	},
	{
		name: 'Jane Doe',
		username: 'jdoe@IDIR',
		role: 'Regional Analyst',
		dateSubmitted: moment('2020-03-01'),
		status: 'DENIED'
	}
];

const userHeaders = [
	{title: 'Name', filterable: false, accessor: (r) => r.name},
	{title: 'Username', filterable: false, accessor: (r) => r.username},
	{title: 'Email', filterable: false, accessor: (r) => r.email},
	{title: 'Role', filterable: false, accessor: (r) => r.role},
];

const userData = [
	{name: 'John Smith', username: 'jsmith@IDIR', email: 'jsmith@email.com', role: 'Authorizations Officer'},
	{name: 'Jane Doe', username: 'jdoe@IDIR', email: 'jdoe@email.com', role: 'Regional Analyst'}
];

const UserList = (props) => {

	return (
		<>
			<TitlecBarButtonContainer title={'Manage Users'}/>

			<TracksTable tableTitle={`Access Requests (${accessRequestData.length})`} headers={accessRequestHeaders}
									 data={accessRequestData}/>

			<TracksTable tableTitle={`Active (${userData.length})`} headers={userHeaders} data={userData} pagination={{
				isPaginated: true,
				totalPages: 1,
				pageNumber: 1
			}}/>
		</>
	);
};

export {UserList};
