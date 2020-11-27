import React from 'react';
import OperatorsList from "../../../common/components/OperatorsList";
import Devnote from "../../../common/components/Devnote";

const Admin = () => {
    return (
        <div>
            <h1>Administration Home Page</h1>

            <Devnote>This is real data from the API server</Devnote>

            <OperatorsList/>
        </div>
    )

};

export default Admin;
