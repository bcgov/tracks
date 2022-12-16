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
	tripDuration: number;
}

const DataSubmissions : FC = () => {
	const headers = useSelector(state => {return state.Auth.headers});
	const configuration = useSelector(getConfiguration);

	const [dataSubmissions, setDataSubmissions] = useState<DataSubmission[]>([]);

	// @todo grab data from new route
	const fetchDataSubmissions = () => {
		const data: Array<DataSubmission> = [];
		try {
			axios.get(`${configuration.API_BASE}/api/v1/admin/activities`, {headers})
				.then((response) => {
					if(response.data) {						
						response.data.map((item, index) => {
							data.push({
								id: item.id,
								organization: 'none' || 'none',
								dateSubmitted: moment(item.createdat).format('ll hh:mm:ss'),
								tenures: item.tenures || 'none',
								status: item.processingstate,
								activity: item.activity || 'none',
								transportationMode: item.mode,
								tripDuration: moment(item.starttime).diff(moment(item.endtime), 'hours'),
							})
						})
					}
				})
				.then(() => {
					return data;
				})
				.catch((err) => {
					console.log(err)
				});
		} catch (error) {
			return data;
		}
	}

	useEffect(() => {
		setDataSubmissions(fetchDataSubmissions());
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