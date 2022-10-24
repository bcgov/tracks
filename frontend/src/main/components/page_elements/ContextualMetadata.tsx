import React from 'react';
import '../../styles/components/contextualMetadata.scss'
import {selectUserInfo} from "../../../state/reducers/userinfo";
import {useSelector} from "../../../state/utilities/use_selector";

const ContextualMetadata = () => {

	const {email, name, organization, initialized, error} = useSelector(selectUserInfo);

	// user info has not succeeded or failed yet
	if (!initialized) {
		return (
			<div className={'contextualMetadata'}>
				<div className={'container'}>
					Userinfo Loading
				</div>
			</div>
		);
	}

	if (error) {
		<div className={'contextualMetadata'}>
			<div className={'container'}>
				Userinfo Failed to Load
			</div>
		</div>
	}

	return (
		<div className={'contextualMetadata'}>
			<div className={'container'}>
				<h1>{organization}</h1>
				<ul>
					<li>{name}</li>
					<li><a href='mailto:'>{email}</a></li>
				</ul>
			</div>
		</div>
	);

}

export default ContextualMetadata;
