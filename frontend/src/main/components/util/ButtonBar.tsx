import React from 'react';


const ButtonBar: React.FC<{children}> = (props) => {

  const {children} = props;

  return (
    <div className={'buttonBar'}>
      {children}
    </div>
  );
};

export default ButtonBar;
