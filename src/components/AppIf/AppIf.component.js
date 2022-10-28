import React from 'react';

const AppIf = ({condition, children}) => {
  if (!condition) {
    return <></>;
  }

  return <>{children}</>;
};

export default AppIf;
