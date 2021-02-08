import React from 'react';


const ButtonBar = (props) => {

  const {children} = props;

  return (
    <div className={'buttonBar'}>
      {children}
    </div>
  );
};

export default ButtonBar;
