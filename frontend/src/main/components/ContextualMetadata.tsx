import React from 'react';
import '../styles/components/contextualMetadata.scss'

const ContextualMetadata = () => {

  return (
    <div className={'contextualMetadata'}>
      <h1>Operator Name</h1>
      <ul>
        <li>Location</li>
        <li><a href="mailto:">Email Address</a></li>
        <li>Phone Number</li>
      </ul>
    </div>
  );
}

export default ContextualMetadata;
