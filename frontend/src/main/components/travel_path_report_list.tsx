import React from "react";
import {TitleBarButtonContainer} from "./util/title";
import {TracksTable} from "./util/tracks_table";
import moment from "moment";
import {Button} from "@mui/material";


const ReportStatus: React.FC<{ status: boolean }> = ({status}) => {

	switch (status) {
	case 'SUBMITTED':
		return (<span>Submitted</span>);
	case 'APPROVED':
		return (<span>Approved</span>);
	case 'REJECTED':
		return (<span>Rejected</span>);

	}
	return null;
};

const reportsHeaders = [
	{title: 'Name', filterable: true, accessor: (r) => r.name},
	{
		title: 'Permit / Tenure', filterable: false, accessor: (r) => r, renderer: v => {
			if (v.tenure) {
				return (<><span>Tenure: </span>{v.tenure}</>);
			}
			if (v.permit) {
				return (<><span>Permit: </span>{v.permit}</>);
			}
			return null
		}
	},
	{
		title: 'Report Period', filterable: false, accessor: (r) => r.reportingPeriod, renderer: v => {
			return (<>{v.start.format('MM/DD/YY')} - {v.end.format('MM/YY/DD')}</>);
		}
	},
	{title: 'Responsible Business Unit', filterable: true, accessor: (r) => r.responsibleBusinessUnit},
	{title: 'Region', filterable: true, accessor: (r) => r.region},
	{title: 'Status', filterable: false, accessor: (r) => r.status, renderer: v => (<ReportStatus status={v}/>)}
];
const reportData = [
	{
		name: 'Operator A',
		permit: 'ABC123',
		tenure: null,
		reportingPeriod: {
			start: moment('2020-09-01'),
			end: moment('2020-12-31')
		},
		responsibleBusinessUnit: 'Land Management Office A',
		region: 'Omenica',
		status: 'SUBMITTED'
	},
	{
		name: 'Operator B',
		permit: 'DEF456',
		tenure: null,
		reportingPeriod: {
			start: moment('2020-09-01'),
			end: moment('2020-12-31')
		},
		responsibleBusinessUnit: 'Land Management Office B',
		region: 'Omenica',
		status: 'APPROVED'
	},
	{
		name: 'Operator C',
		permit: null,
		tenure: '0912309123',
		reportingPeriod: {
			start: moment('2020-09-01'),
			end: moment('2020-12-31')
		},
		responsibleBusinessUnit: 'Land Management Office B',
		region: 'Skeena',
		status: 'SUBMITTED'
	},
	{
		name: 'Operator D',
		permit: null,
		tenure: '09812039812',
		reportingPeriod: {
			start: moment('2020-09-01'),
			end: moment('2020-12-31')
		},
		responsibleBusinessUnit: 'Land Management Office X',
		region: 'Skeena',
		status: 'REJECTED'
	}
];

const TravelPathReportList = (props) => {

	return (
		<>
			<TitleBarButtonContainer title={'Reports'}>
				<Button variant={'outlined'}>
					{/*<SaveAltIcon /> Export Selected*/}
				</Button>
			</TitleBarButtonContainer>

			<TracksTable headers={reportsHeaders}
									 data={reportData}
									 selectableRows
									 pagination={{
										 isPaginated: true,
										 pageNumber: 1,
										 totalPages: 1
									 }}
			/>
		</>
	);
};

export {TravelPathReportList};
