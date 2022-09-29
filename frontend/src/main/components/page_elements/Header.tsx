import React from 'react';
import {Link} from "react-router-dom";
import {Button} from '@mui/material';
import Icon from '@mdi/react'
import {mdiAccountCircle} from '@mdi/js'
import "../../styles/header.scss";
import {keycloakInstance} from "../../../state/sagas/auth";
import GovLogo from '../../styles/assets/images/gov3_bc_logo.png';
import {useSelector} from "../../../state/utilities/use_selector";

const Header = () => {
	const bestName = useSelector(state => state.Auth.bestName);
	return (
		<header id="header" className={'header'}>
			<div className={'container'}>
				<Link to="/" className={'homeLink'}>
					<img src={GovLogo} alt={'BC Government Logo'} id="logo"/>
					Tracks
				</Link>
				<nav className="profile">
					<li>
						<div className={'username'}>
							<Icon path={mdiAccountCircle}
								title="User Profile"
								size={1}/>
							<span>
								{bestName}
							</span>
						</div>
					</li>
					<li>
						{/*@todo dispatch this*/}
						<Button className={'logout'} color="primary"
							onClick={() => keycloakInstance.logout()}
						>
							Log out
						</Button>
					</li>
				</nav>
			</div>
		</header>
	);
}

export default Header;
