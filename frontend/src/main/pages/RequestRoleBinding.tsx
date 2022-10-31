import React, {useEffect, useState} from 'react';
import ButtonBar from "../components/util/ButtonBar";
import {Button, FormControl, Input, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import FormGroup from "../components/util/FormGroup";
import {connect, useDispatch} from "react-redux";
import {CHECK_SIGNUP_STATUS_REQUEST, SIGNUP_REQUEST_BINDING_SUBMIT} from "../../state/actions";
import Loading from "../components/util/Loading";
import {useSelector} from "../../state/utilities/use_selector";

interface RoleBindingProps {
	idir: boolean;
	loading: boolean;
	saving: boolean;
	signupRequested: boolean;
}

const RequestRoleBinding = ({idir, loading, saving, signupRequested}: RoleBindingProps) => {
	const dispatch = useDispatch();

	const [formState, setFormState] = useState({
		reason: '',
		requestedRole: 'commercial_operator'
	});

	const auth = useSelector(state => state.Auth);

	const bceIdRoles = [
		{
			value: 'commercial_operator',
			name: 'CR Operator',
			help: (
				<p><strong>CR Operator</strong>: Commercial Recreation operator with a Tenure agreement and/or Park Permit with
					the BC Government</p>)
		}
	];

	const idirRoles = [
		{
			name: 'Area Administrator',
			value: 'area_admin',
			help: 'Administer an area'
		},
		{
			name: 'System Administrator',
			value: 'admin',
			help: 'Administer the system'
		},
		{
			name: 'Conservation Officer',
			value: 'conservation_officer',
			help: 'Submit reports'
		},
	];

	const [roles, setRoles] = useState(idir ? idirRoles : bceIdRoles);

	// dispatch a request to see if we've already tried to register
	useEffect(() => {
		dispatch({
			type: CHECK_SIGNUP_STATUS_REQUEST
		});
	}, [saving]);


	const sendRequest = () => {
		dispatch({
			type: SIGNUP_REQUEST_BINDING_SUBMIT, payload: {
				request: {
					reason: formState.reason,
					requestedRole: formState.requestedRole,
				}
			}
		});
	}

	const handleChange = (event) => {
		const updatedState = {
			...formState,
			[event.target.name]: event.target.value
		};
		setFormState(updatedState)
	}

	const bceidMessage = () => (
		<p>Your Business BCeID is not yet associated with a Commercial Recreation Operator profile. To
			use <strong>TRACKS</strong>, your
			BCeID account must be linked with an existing Commercial Operator. Please use this form to submit your
			request for access. It will be reviewed by the appropriate authority.
		</p>
	);
	const idirMessage = () => (
		<p>Your IDIR is not yet associated with a role.</p>
	)

	const roleHelp = () => {
		if (formState.requestedRole == null) {
			return null;
		}
		const foundRole = roles.find(r => r.value == formState.requestedRole);
		if (foundRole) {
			return (foundRole.help);
		}
		return null;

	}

	if (loading || saving) {
		return (<Loading/>);
	}

	if (signupRequested) {
		return (
			<div className={'container'} id={"mainColumnLayout"}>
				<div className={'containerInner'}>
					<h4>Your request to join is pending...</h4>
				</div>
			</div>
		)
	}

	return (
		<div className={'container'} id={"mainColumnLayout"}>
			<div className={'containerInner'}>

				<div>
					<Typography variant={'h5'}>New User</Typography>
					<div>
						{idir && idirMessage()}
						{!idir && bceidMessage()}
					</div>

					<FormGroup>

						<Typography variant={'h5'}>Access Request</Typography>

						<FormControl>
							<InputLabel id="label-role-select">Requested Access</InputLabel>

							<Select
								labelId="label-role-select"
								name="requestedRole"
								onChange={handleChange}
								value={formState.requestedRole}
							>
								{roles.map(r => (
									<MenuItem key={r.name} value={r.value}>{r.name}</MenuItem>
								)
								)}

							</Select>
						</FormControl>

						<p>
							{roleHelp()}
						</p>

						<br/>
						<FormControl>
							<InputLabel id="label-activity-select">Reason</InputLabel>
							<Input name='reason' onChange={handleChange} type={'text'}
										 placeholder={"Your reason for requesting access"} value={formState.reason}></Input>
						</FormControl>
						<br/>

						<div>
							<ButtonBar>
								<Button
									variant="contained"
									color="primary"
									onClick={sendRequest}
								>Submit Request</Button>
							</ButtonBar>

						</div>
					</FormGroup>

				</div>
			</div>
		</div>
	)

};

RequestRoleBinding.defaultProps = {};

const mapStateToProps = (state) => {
	const mappedProps = {
		currentUserRoles: state.Auth.roles,
		bestName: state.Auth.bestName,
		idir: state.Auth.idir,
		signupRequested: state.CheckSignup.signupRequested,
		loading: state.CheckSignup.loading,
		saving: state.Signup.loading
	};

	return mappedProps;
}


export default connect(mapStateToProps, null)(RequestRoleBinding);
