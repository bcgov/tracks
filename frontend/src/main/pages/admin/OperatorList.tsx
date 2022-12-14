import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {OperatorActions} from "../../../state/actions";
import Loading from "../../components/util/Loading";
import {Box, Button, Grid, Typography} from "@mui/material";
import {useSelector} from "../../../state/utilities/use_selector";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CreateAdminTenureDialog } from '../../../main/components/CreateTenureDialog';

const OperatorList = () => {
	// const detailRoute = `/admin/organizations/view/:id`;

	const items = useSelector(state => state.Operators.items);
	const loading = useSelector(state => state.Operators.loading);

	const [organization, setOrganization] = useState<string>()
	const [tenureDialog, setTenureDialog] = useState<boolean>(false);
	const handleTenureDialog = () => { setTenureDialog(!tenureDialog); };

	const dispatch = useDispatch();
	const load = () => dispatch({type: OperatorActions.LIST_REQUEST, payload: {api: 'admin'}})

	const commercialOperatorColumns: GridColDef[] = [
		{        
			field: 'name', 
			headerName: 'Name', 
			flex: 2
		},
		{        
			field: 'region', 
			headerName: 'Region', 
			flex: 1
		},
		{        
			field: 'type', 
			headerName: 'Type', 
			flex: 1.5
		},
		{        
			field: 'status', 
			headerName: 'Status', 
			flex: 1
		},
		{
			field:'action',
			headerName: 'Action',
			flex: 1,
			sortable: false,
			renderCell: (params) => {
				const onClick = (e) => {
					e.stopPropagation();
					setOrganization(params.row)
					handleTenureDialog();
				}
				return <Button
					onClick={onClick}
					variant={'contained'}
					color='primary'
				>Add Tenure</Button>
			}
		}
	];

	const commercialOperatorRowRenderer = () => {
		const rows = [];

		if (items.length) {
			items.map((item) => {
				rows.push({
					id: item.id,
					name: item.name,
					region: item.region,
					type: item.type,
					status: item.active ? 'active' : 'inactive'
				})
			});
			return rows;
		}
		return [];
	}

	useEffect(() => {
		load();
	}, []);

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<Grid container direction='row'>
					<Grid item>
						<Typography variant='h5'>Commercial Operators</Typography>
					</Grid>
				</Grid>

				<br />

				<DataGrid
					rows={commercialOperatorRowRenderer()}
					columns={commercialOperatorColumns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
					disableColumnSelector
					style={{height: 600}}
				/>
				{organization ? (
					<CreateAdminTenureDialog handleClose={handleTenureDialog} open={tenureDialog} organizationName={organization.name} organizationID={organization.id} />
				) : null}
			</Box>		
		</>
	);
};

export default OperatorList;
