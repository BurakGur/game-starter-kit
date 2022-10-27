import React from 'react';
import {BoxComponent} from './AppBox.style';

const AppBox = ({children, ...props}) => {
  return <BoxComponent {...props}>{children}</BoxComponent>;
};

export default AppBox;
