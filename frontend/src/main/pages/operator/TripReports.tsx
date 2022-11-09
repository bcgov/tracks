import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// @todo grab data from db regarding trip reports
const fetchTripReportData = () => {
	return null;
};

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

const rows = fetchTripReportData.length ? 
	fetchTripReportData : 
	[ { id: 'No data was found.', submissionDate: '', status: '' } ];

const TripReports: FC = () => {
	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
				/>
			</Box>
		</>
	);
}

export default TripReports;