import React, {FC, useEffect, useState} from 'react';

import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getConfiguration } from "../../../state/utilities/config_helper";
import moment from 'moment';


const DataSubmissionColumns: GridColDef[] = [
	{
		field: 'organization', 
		headerName: 'Organization',
		flex: 2
	},
	{        
		field: 'dateSubmitted', 
		headerName: 'Date Submitted', 
		flex: 2
	},
	{        
		field: 'tenures', 
		headerName: 'Tenures', 
		flex: 1
	},
	{        
		field: 'status', 
		headerName: 'Status', 
		flex: 1
	},
	{        
		field: 'activity', 
		headerName: 'activity', 
		flex: 1
	},
	{        
		field: 'transportationMode', 
		headerName: 'Transportation Mode', 
		flex: 1.5
	},
	{        
		field: 'tripDuration', 
		headerName: 'Trip Duration', 
		flex: 1
	},
];

class DataSubmission {
	id: string;
	organization: string;
	dateSubmitted: string;
	tenures: string;
	status: string;
	activity: string;
	transportationMode: string;
	tripDuration: string;
}

class Organization {
	id: string;
	name: string;
	active: string;
}

const DataSubmissions : FC = () => {
	const headers = useSelector(state => {return state.Auth.headers});
	const configuration = useSelector(getConfiguration);

	const [dataSubmissions, setDataSubmissions] = useState<DataSubmission[]>([]);

	// This assumes the orgID is unique. This might break if this assumption is untrue.
	const compareToOrg = (itemId, orgList) => {
		for(let i = 0; i < orgList.length; i++) {
			if(itemId === orgList[i].id) {
				return orgList[i].name;
			}
		}
	}

	const fetchOrganizationList = () => {
		const data: Array<Organization> = [];
		try {
			axios.get(`${configuration.API_BASE}/api/v1/admin/organizations`, {headers})
				.then((response) => {
					if (response.data) {
						response.data.map((item) => {
							data.push({
								id: item.id,
								name: item.name,
								active: item.active
							})
						})
						return data;
					}
				}).then((data) => {
					fetchDataSubmissions(data);
				})
		} catch (err) {
			console.log(err);
		}
	}

	const fetchDataSubmissions = async (orgRefs) => {
		const data: DataSubmission[] = [];
		try {
			await axios.get(`${configuration.API_BASE}/api/v1/admin/activities`, {headers})
				.then((response) => {
					if(response.data && orgRefs.length) {
						response.data.map((item) => {
							data.push({
								id: item.id,
								organization: compareToOrg(item.organizationid, orgRefs),
								dateSubmitted: moment(item.createdat).format('ll hh:mm:ss'),
								tenures: item.tenures || 'none',
								status: item.processingstate,
								activity: item.activity || 'none',
								transportationMode: item.mode,
								tripDuration: moment(item.endtime).diff(moment(item.starttime), 'hours') + ' Hours',
							})
						});
						setDataSubmissions(data);
					}
				})
				.catch((err) => {
					console.log(err)
				});
		} catch (error) {
			return data;
		}
	}

	useEffect(() => {
		fetchOrganizationList()
	}, []);
    
	return (
		<>
			<Grid container>
				<Grid item>
					<Typography variant='h5'>Data Submissions</Typography>
				</Grid>
			</Grid>

			<br />
        
			<Grid container direction='column'>
				<Grid item>
					<Typography variant='body1' sx={{color: 'gray'}}>Recent Data Submissions</Typography>
				</Grid>
				<Grid item>
					<DataGrid
						rows={dataSubmissions.length ? dataSubmissions : []}
						columns={DataSubmissionColumns}
						pageSize={10}
						rowsPerPageOptions={[10]}
						disableSelectionOnClick
						disableColumnSelector
						style={{height: 600}}
					/>
				</Grid>
			</Grid>
		</>
	)
}

export default DataSubmissions;