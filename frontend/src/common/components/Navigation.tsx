import React, {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {KeycloakContext} from './AuthRequired';
import '../styles/nav.scss'

const Navigation = (props) => {
    const {history} = props;
    const keycloak = useContext(KeycloakContext);

    const nav = (path, name) => ({
        path,
        name,
    });


    const navs = [
        nav('/operator/home', 'Commercial Recreation Operator Home'),
        nav('/admin/home', 'Administration Home'),
        nav('/conservation_officer/home', 'Conservation Officer Home'),
        nav('/map', 'Leaflet Demo'),
    ];


    const bestName = () => {
        const preferenceOrder = ['name', 'preferred_username', 'given_name', 'sub'];

        for (const p of preferenceOrder) {
            if ((p in keycloak.idTokenParsed) &&
                (keycloak.idTokenParsed[p] !== null) &&
                (keycloak.idTokenParsed[p].length > 0)) {
                return keycloak.idTokenParsed[p];
            }
        }

        return 'User';
    };

    const [activeLink, setActiveLink] = useState(null);

    useEffect(() => {
        setActiveLink(history.location.pathname);
    }, [history.location.pathname]);

    return (
        <div className={'topNav nav'}>
            <ul>
                {navs.map((n) => (
                    <li key={n.name}>
                        <button
                            className={activeLink === n.path ? 'active' : ''}
                            onClick={() => history.push(n.path)}
                            disabled={activeLink === n.path}
                        >
                            {n.name}
                        </button>
                    </li>
                ))}
                <li className={'filler'} />
                <li className={'right'}>
                    <button
                        onClick={() => keycloak.logout()}
                    >
                        Logout {bestName()}
                    </button>
                </li>
            </ul>
        </div>
    );
}


export default withRouter(Navigation);
