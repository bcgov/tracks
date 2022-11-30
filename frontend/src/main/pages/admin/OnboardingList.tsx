import React, {useState} from 'react';
import Loading from "../../components/util/Loading";
import {OnboardingRequestActions, TenureBindingRequestActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import OnboardingDialog from "../../components/auth/OnboardingDialog";
import { Button, Grid } from "@mui/material";
import { useSelector } from "../../../state/utilities/use_selector";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import CreateTenureApprovalDialog from '../../components/CreateTenureApprovalDialog';

const OnboardingList = () => {
	// Code tables
	const organizations = [
		{id: 1, name: 'Government of British Columbia'},
		{id: 2, name: 'Commercial Operator 1'},
		{id: 3, name: 'Commercial Operator 2'},
	];

	const userColumns: GridColDef[] = [
		{
			field:'full_name',
			headerName: 'User',
			flex: 3
		},		
		{
			field:'type',
			headerName: 'Type of Account',
			flex: 2
		},		
		{
			field:'requested_role',
			headerName: 'Requested Role',
			flex: 2
		},		
		{
			field:'status',
			headerName: 'Status',
			flex: 2
		},		
		{
			field:'created',
			headerName: 'Date',
			flex: 2
		},		
		{
			field:'action',
			headerName: 'Action',
			flex: 2,
			sortable: false,
			renderCell: (params) => {
				const onClick = (e) => {
					e.stopPropagation();
					setActionState({
						request: params.row.data
					});
					setModalOpen(true);
				}
				return <Button
					onClick={onClick}
					variant={'contained'}
					color='primary'
				>Action</Button>
			}
		},
	]

	const tenureColumns: GridColDef[] = [
		{
			field: 'id', 
			headerName: 'Trip ID',
			flex: 1
		},
		{        
			field: 'reference', 
			headerName: 'Reference', 
			flex: 2
		},
		{        
			field: 'organization', 
			headerName: 'Organization', 
			flex: 2
		},
		{        
			field: 'startdate', 
			headerName: 'Start Date', 
			flex: 3
		},
		{        
			field: 'enddate', 
			headerName: 'End Date', 
			flex: 3
		},
		{
			field: 'requestState', 
			headerName: 'Request State', 
			flex: 3
		},
		{
			field: 'requestCreationDate', 
			headerName: 'Request Creation Date', 
			flex: 3
		},
		{        
			field: 'approve', 
			headerName: 'Approval', 
			flex: 2,
			sortable: false,
			renderCell: (params) => {
				const onClick = (e) => {
					e.stopPropagation();
					const thisRow = params.row;
					setSelectedTenureRow(thisRow);
					handleTenureApprovalDialog();					
				};
				return (
					<Button 
						onClick={onClick}
						variant={'contained'}
						color='primary'
					>
						Action
					</Button>
				)
				
			}
		},
	];

	const [selectedTenureRow, setSelectedTenureRow] = useState();

	const items = useSelector(state => state.OnboardingRequests.items);
	const loading = useSelector(state => state.OnboardingRequests.loading);
	const [actionState, setActionState] = useState({
		request: null
	});
	const [modalOpen, setModalOpen] = useState(false);
	const [updateCount, setUpdateCount] = useState(0);

	const handleClose = () => {
		setModalOpen(false);
		setUpdateCount(updateCount + 1);
	}

	const [openTenureApprovalDialog, setOpenTenureApprovalDialog] = useState(false);
	const handleTenureApprovalDialog = () => {
		setOpenTenureApprovalDialog(!openTenureApprovalDialog)
	}

	// Loading Tenure Rows for the Tenure Table
	useList(TenureBindingRequestActions, 'admin');
	const fetchTenureData = () => {
		const binding_tenures = useSelector(state => {return state.TenureBindingRequests.items} )
		const rows = [];
		if(binding_tenures.length) {
			binding_tenures.map((item) => {
				rows.push({
					id: item.id || null,
					reference: item.reference || null,
					organization: item.organization || null,
					startdate: item.requested_start_date ? moment(item.requested_start_date).format('ll') : null,
					enddate: item.requested_end_date ? moment(item.requested_end_date).format('ll') : null,
					requestState: item.state || null,
					requestCreationDate: moment(item.created).format('ll') || null
				}) 
			});
		}
		return rows;
	}
	const tenureRows = fetchTenureData();

	// Loading user onboarding rows for onboarding table
	useList(OnboardingRequestActions, 'admin', [updateCount]);
	const fetchUserData = () => {
		const onboarding_requests = useSelector(state => state.OnboardingRequests.items)
		const rows = [];
		if(onboarding_requests.length) {
			onboarding_requests.map((item) => {
				rows.push({
					id: item.id,
					full_name: item.full_name,
					type: item.username.substring(item.username.indexOf('@') + 1, item.username.length),
					requested_role: item.requested_role,
					status: item.status,
					created: moment(item.created).format('ll hh:mm'),
					data: item
				})
			})
		}
		return rows;
	}
	const userRows = fetchUserData();

	if (loading || items === undefined) {
		return (<Loading/>);
	}

	return (
		<Grid container direction='column'>
			<Grid item>
				<h2>User Onboarding Requests</h2>
			</Grid>
			{actionState.request &&
				<OnboardingDialog request={actionState.request} organizations={organizations} open={modalOpen}
					handleClose={handleClose}/>
			}
			<Grid item>
				<DataGrid
					style={{height: '50vh'}}
					rows={userRows}
					columns={userColumns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
				/>
			</Grid>
			<Grid item>
				<br />
				<h2>Tenure Binding Requests</h2>
			</Grid>
			<Grid item>
				<DataGrid
					style={{height: '50vh'}}
					rows={tenureRows}
					columns={tenureColumns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
				/>
				<CreateTenureApprovalDialog open={openTenureApprovalDialog} handleClose={handleTenureApprovalDialog} id={selectedTenureRow ? selectedTenureRow.id : tenureRows}/>
			</Grid>
		</Grid>
	);

}
export default OnboardingList;
