import React from 'react';


const FormGroup: React.FC<{children}> = (props) => {

  const {children} = props;

  return (
    <div className={'formGroup'}>
      {children}
    </div>
  );
};

export default FormGroup;
