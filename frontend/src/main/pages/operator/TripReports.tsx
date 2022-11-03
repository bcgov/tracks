import React, { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{
		field: 'id', 
		headername: 'Trip ID', 
		width: 90
	},
	{        
		field: 'submissionDate', 
		headername: 'Submission Date', 
		width: 90
	},
	{        
		field: 'status', 
		headername: 'Status', 
		width: 90
	},
]

const TripReports: FC = () => {
	return (
		<>
		</>
	);
}