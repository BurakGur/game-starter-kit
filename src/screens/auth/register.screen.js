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
import {Platform, StatusBar} from 'react-native';
import {themeState} from '@store/selectors';
import {collection} from '@utils/firebase';
import {redis} from '@utils/redis';

const LoginScreen = ({navigation}) => {
  const [, setUser] = useRecoilState(userState);
  const [data, setData] = useState();
  const theme = useRecoilValue(themeState);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({});

  const onSubmit = async data => {
    collection('Users')
      .where('username', '==', data.username)
      .get()
      .then(async snapshot => {
        if (snapshot.empty) {
          await redis.set(data.username, 0);
          const user = {
            username: data.username,
            os: Platform.OS,
            version: Platform.Version,
            createdDate: new Date(),
          };
          collection('Users')
            .add(user)
            .then(async () => {
              setUser(user);
              await saveUser(user);
              navigation.reset({
                index: 0,
                routes: [{name: 'ArticleList'}],
              });
            });
        } else {
          console.log('no no no');
        }
      });
  };

  const onChange = data => {
    console.log(data);
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
        error={errors.username}
        control={control}
        rules={{required: true, minLength: 6}}
        name="username"
        autoCapitalize="none"
        label={t('_formElement.username')}
        placeholder="Nebukadnezar"
        onChangeText={onChange}
        isUsernameInput={true}
      />
      <AppText>{data}</AppText>
      <AppBox justifyContent="flex-end" alignItems="flex-end" marginBottom={theme.spaces.x14}>
        <AppText>{t('_loginScreen.forgotPassword')}</AppText>
      </AppBox>
      <AppButton onPress={handleSubmit(data => setData(JSON.stringify(data)))} title="Giriş Yap" />
    </AuthLayout>
  );
};

export default LoginScreen;
