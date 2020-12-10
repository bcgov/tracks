import * as React from 'react';
import '../styles/auth.scss';
import CONFIG from "../config";

const Devnote = (props) => {

    const {children} = props;

    if (CONFIG.NOTES_ENABLED) {
        return (<div className="devNote">{children}</div>);
    } else {
        return null;
    }
};

export default Devnote;

