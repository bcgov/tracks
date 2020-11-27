import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import CONFIG from "../config";
import Loading from "./Loading";

const OperatorsList = () => {

        const [loaded, setLoaded] = useState(false);
        const [operators, setOperators] = useState([]);


        useEffect(() => {
            axios.get(`${CONFIG.API_BASE}/api/v1/operators`).then((response) => {
                setOperators(response.data);
                setLoaded(true);
            });
        }, []);

        if (!loaded) {
            return <Loading/>;
        };

        return (
            <table>
                <thead>
                <tr>
                    <th>Operator</th>
                    <th>Region</th>
                </tr>
                </thead>
                <tbody>
                {operators.map(o => (
                    <tr>
                        <td>{o.name}</td>
                        <td>{o.region}</td>
                    </tr>
                ))}</tbody>
            </table>
        )

    }
;

export default OperatorsList;
