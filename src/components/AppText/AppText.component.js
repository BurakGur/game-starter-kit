import React from 'react';
import {TextComponent} from './AppText.style';

const AppText = ({children, ...props}) => {
  return <TextComponent {...props}>{children}</TextComponent>;
};

export default AppText;
