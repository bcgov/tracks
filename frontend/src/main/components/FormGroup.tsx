import React from 'react';


const FormGroup = (props) => {

  const {children} = props;

  return (
    <div className={'formGroup'}>
      {children}
    </div>
  );
};

export default FormGroup;
