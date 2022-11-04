import React, { FC } from 'react';

import { selectTripReports } from '../../../state/reducers/tripreports';
import { useSelector } from '../../../state/utilities/use_selector';

import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{
		field: 'id', 
		headerName: 'Trip ID',
		flex: 1
	},
	{        
		field: 'submissionDate', 
		headerName: 'Submission Date', 
		flex: 1
	},
	{        
		field: 'status', 
		headerName: 'Status', 
		flex: 1
	},
	{        
		field: 'tenures', 
		headerName: 'Tenures', 
		flex: 1
	},
	{        
		field: 'permits', 
		headerName: 'Permits', 
		flex: 1
	},
	{        
		field: 'activities', 
		headerName: 'Activities', 
		flex: 1
	},
];


const TripReports: FC = () => {
	// @todo grab data from db regarding trip reports
	const fetchTripReportData = () => {
		const {id, created_at, updated_at, park_permit_id, tenure_id, state, type, reporting_period_id} = useSelector(selectTripReports);
		return null;
	};

	// will populate the first cell with a message if no data was found.
	const rows = fetchTripReportData.length ? 
		fetchTripReportData : 
		[ { id: 'No data was found.', submissionDate: '', status: '' } ];

	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<Typography variant='h5'>Trip Reports</Typography> <br />
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
					disableColumnSelector
				/>
			</Box>
		</>
	);
}

export default TripReports;