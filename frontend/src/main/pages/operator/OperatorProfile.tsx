import React from 'react';

const OperatorProfile = () => {
  return (
    <div>
      <div className={'pg-title'}>
        <div className={'container'}>
          <h1>Operator Name</h1>
          <ul className={'titlebar__meta'}>
            <li>Location</li>
            <li><a href="mailto:">Email Address</a></li>
            <li>Phone Number</li>
          </ul>
        </div>
      </div>
      <div className={'pg-body'}>
        <div className={'container'}>
          <h2>Insert Operator Reports Here</h2>
        </div>
      </div>
    </div>
  )

};

export default OperatorProfile;
