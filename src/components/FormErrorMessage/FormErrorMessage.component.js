import React from 'react';
import {FormErrorMessageComponent} from './FormErrorMessage.style';
import t from '@locale';

const FormErrorMessage = ({error, label}) => {
  return (
    <>
      {error && (
        <FormErrorMessageComponent>
          {t(`_formErrorMessages.${error.type}`, {label})}
        </FormErrorMessageComponent>
      )}
    </>
  );
};

export default FormErrorMessage;
