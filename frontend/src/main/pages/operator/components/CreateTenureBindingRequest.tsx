import React, {useState} from 'react';
import {useSelector} from "../../../../state/utilities/use_selector";
import axios from "axios";
import {getConfiguration} from "../../../../state/utilities/config_helper";
import {useDispatch} from "react-redux";

const CreateTenureBindingRequest = () => {

	const [reference, setReference] = useState('');
	const authHeaders = useSelector(state => state.Auth.headers);
	const configuration = useSelector(getConfiguration);
	const dispatch = useDispatch();

	const [working, setWorking] = useState(false);
	const [message, setMessage] = useState(null);
	const [valid, setValid] = useState(false);

	const handleChange = (e) => {
		setReference(e.target.value);
		setMessage('');

		if (reference.length >= 4 && reference.length <= 20) {
			setValid(true);
		} else {
			setValid(false)
		}
	}

	const handleSubmit = (e) => {
		setWorking(true);

		const payload = {
			reference
		};

		axios.post(`${configuration.API_BASE}/api/v1/operator/tenure_bindings`,
			payload,
			{
				headers: authHeaders,
			}).then(() => {
			dispatch({type: 'TENURE_BINDING_REQUEST_LIST_REQUEST', payload: {api: 'operator'}});
			setReference('');
			setMessage('Request complete')
			setWorking(false);
		}).catch((() => {
			setMessage('An error occurred');
			setWorking(false);
		}));
	}

	return (
		<>
			<h2>New Tenure Binding Request</h2>
			<span>You are requesting that your organization is associated with a new tenure. Please input your reference ID (tenure number). Your request will be reviewed by the Ministry.</span>
			<input minLength={4} maxLength={20} required value={reference} onChange={handleChange}/>
			<input disabled={working || !valid} type={'button'} onClick={handleSubmit} value='Submit'/>

			<span>{message}</span>
		</>
	);
};

export default CreateTenureBindingRequest;
