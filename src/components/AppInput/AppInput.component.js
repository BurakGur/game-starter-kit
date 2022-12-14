import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {FormErrorMessage, AppText, AppIf} from '@components';
import {InputComponent, LabelComponent, InputContainer} from './AppInput.style';
import {useRecoilValue} from 'recoil';
import {themeState} from '@store/selectors';
import {usernameFormatter} from '@utils/username';

const AppInput = ({
  control,
  name,
  label,
  placeholder,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = false,
  isSecureText = false,
  rules = {},
  isUsernameInput = false,
}) => {
  const theme = useRecoilValue(themeState);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      rules={rules}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <LabelComponent error={!!error} focused={isFocused}>
            {label}
          </LabelComponent>
          <InputComponent
            secureTextEntry={isSecureText}
            selectionColor={theme.colors.text_02}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.text_05}
            error={!!error}
            focused={isFocused}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur(value);
            }}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
          />
          <FormErrorMessage label={label} error={error} />
          <AppIf condition={isUsernameInput}>
            <AppText marginTop={theme.spaces.x2}>Kullanıcı Adı: {usernameFormatter(value)}</AppText>
          </AppIf>
        </InputContainer>
      )}
      name={name}
    />
  );
};

export default AppInput;
