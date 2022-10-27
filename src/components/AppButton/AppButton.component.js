import React from 'react';
import {ButtonComponent, ButtonTextComponent} from './AppButton.style';

const AppButton = ({title, ...props}) => {
  return (
    <ButtonComponent {...props}>
      <ButtonTextComponent>{title}</ButtonTextComponent>
    </ButtonComponent>
  );
};

export default AppButton;
