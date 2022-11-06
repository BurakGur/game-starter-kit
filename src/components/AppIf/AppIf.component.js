import React from 'react';

const AppIf = ({condition, children}) => {
  console.log(condition);
  if (!condition) {
    return <></>;
  }

  return <>{children}</>;
};

export default AppIf;
