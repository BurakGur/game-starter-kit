import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import api from '@services/api';
import {AppInput, AppBox, AppButton} from '@components';
import {AuthLayout} from '@layouts';
import t from '@locale';
import {emailPattern} from '@constants/patterns';
import {getEmailForLogoutUser, saveUser} from '@utils/user';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {AppText} from '@/components';
import {StatusBar} from 'react-native';
import {themeState} from '@/store/selectors';

const LoginScreen = ({navigation}) => {
  const [, setUser] = useRecoilState(userState);
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    const setEmail = async () => {
      const email = await getEmailForLogoutUser();
      if (email) {
        reset({
          email: email,
        });
      }
    };
    setEmail();
  }, [reset]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async data => {
    await api.auth
      .login(data.email, data.password)
      .then(async response => {
        const user = response.data.user;
        setUser(user);
        await saveUser(user);
        navigation.reset({
          index: 0,
          routes: [{name: 'ArticleList'}],
        });
      })
      .catch(error => console.log('error', error));
  };

  StatusBar.setBarStyle('dark-content', true);

  return (
    <AuthLayout justifyContent="flex-start" alignItems="center">
      <AppText
        fontSize={theme.fontSize.subtitle}
        color={theme.colors.text_01}
        fontFamily={theme.fontFamily.medium}
        marginBottom={theme.spaces.x2}
        marginTop={theme.spaces.x4}>
        {t('_loginScreen.welcome')}
      </AppText>
      <AppText
        fontSize={theme.fontSize.small}
        color={theme.colors.text_03}
        textAlign="center"
        marginRight={theme.spaces.x5}
        marginLeft={theme.spaces.x5}
        lineHeight={theme.lineHeight.x20}
        marginBottom={theme.spaces.x6}
        width="auto">
        {' '}
        Aliquip adipisicing velit dolor quis labore adipisicing minim ad commodo id mollit laboris aliqua.
      </AppText>
      <AppInput
        error={errors.email}
        control={control}
        rules={{required: true, pattern: emailPattern}}
        name="email"
        keyboardType="email-address"
        autoCapitalize="none"
        label={t('_formElement.email')}
        placeholder="john@fabula.com"
      />
      <AppInput
        error={errors.password}
        control={control}
        rules={{required: true, minLength: 6}}
        isSecureText={true}
        name="password"
        label={t('_formElement.password')}
        placeholder="********"
      />
      <AppBox justifyContent="flex-end" alignItems="flex-end" marginBottom={theme.spaces.x14}>
        <AppText>{t('_loginScreen.forgotPassword')}</AppText>
      </AppBox>
      <AppButton onPress={handleSubmit(onSubmit)} title="Giriş Yap" />
      <AppText marginTop={theme.spaces.x15}>Hesabınız yok mu? Üye Ol</AppText>
    </AuthLayout>
  );
};

export default LoginScreen;
