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
		flex: 1
	},
	{        
		field: 'dateSubmitted', 
		headerName: 'Date Submitted', 
		flex: 1
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
		flex: 2
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
	const [organizationList, setOrganizationList] = useState<Organization[]>([]);

	// This assumes the orgID is unique. This might break if this assumption is untrue.
	const compareToOrg = (itemId, orgList) => {
		for(let i = 0; i < orgList.length; i++) {
			if(itemId === orgList[i].id) {
				return orgList[i].name;
			}
		}
	}

	const fetchOrganizationList = async () => {
		const data: Array<Organization> = [];
		try {
			await axios.get(`${configuration.API_BASE}/api/v1/admin/organizations`, {headers})
				.then((response) => {
					if (response.data) {
						response.data.map((item) => {
							data.push({
								id: item.id,
								name: item.name,
								active: item.active
							})
						})
						setOrganizationList(data);
					}
				})
		} catch (err) {
			console.log(err);
		}
	}

	const fetchDataSubmissions = async () => {
		const data: DataSubmission[] = [];
		try {
			fetchOrganizationList();
			await axios.get(`${configuration.API_BASE}/api/v1/admin/activities`, {headers})
				.then((response) => {
					if(response.data) {						
						response.data.map((item) => {
							data.push({
								id: item.id,
								organization: compareToOrg(item.organizationId, organizationList),
								dateSubmitted: moment(item.createdat).format('ll hh:mm:ss'),
								tenures: item.tenures || 'none',
								status: item.processingstate,
								activity: item.activity || 'none',
								transportationMode: item.mode,
								tripDuration: moment(item.endtime).diff(moment(item.starttime), 'hours') + ' Hours',
							})
						});
						setDataSubmissions(data);
						return data;
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
		fetchDataSubmissions();
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
						rows={dataSubmissions}
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