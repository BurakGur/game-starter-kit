import React from 'react';
import {useForm} from 'react-hook-form';
import {AppInput, AppBox, AppButton} from '@components';
import {AuthLayout} from '@layouts';
import t from '@locale';
import {saveUser} from '@utils/user';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {AppText} from '@/components';
import {Alert, Platform, StatusBar} from 'react-native';
import {themeState} from '@store/selectors';
import {collection} from '@utils/firebase';
import {redis} from '@utils/redis';

const LoginScreen = ({navigation}) => {
  const user = useRecoilValue(userState);
  const theme = useRecoilValue(themeState);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({});

  const onSubmit = async data => {
    console.log('data', data);
    collection('Groups')
      .where('groupname', '==', data.groupname)
      .get()
      .then(async snapshot => {
        console.log('helooo', snapshot);
        if (snapshot.empty) {
          const groupData = {
            groupname: data.groupname,
            user: user.username,
            createdDate: new Date(),
          };
          collection('Groups')
            .add(groupData)
            .then(async () => {
              navigation.reset({
                index: 0,
                routes: [{name: 'GroupSettings'}],
              });
            });
        } else {
          Alert.alert('Geçersiz Grup Adı', 'Bu grup adı başka bir grup tarafından kullanılmaktadır.', [
            {text: 'Tamam', onPress: () => console.log('OK Pressed')},
          ]);
        }
      });
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
        Grup Kur
      </AppText>
      <AppInput
        error={errors.groupname}
        control={control}
        rules={{required: true, minLength: 6}}
        name="groupname"
        autoCapitalize="none"
        label={t('_formElement.groupname')}
        placeholder="Nebukadnezar"
        isUsernameInput={true}
      />
      <AppBox justifyContent="flex-end" alignItems="flex-end" marginBottom={theme.spaces.x14}>
        <AppText>{t('_loginScreen.forgotPassword')}</AppText>
      </AppBox>
      <AppButton onPress={handleSubmit(onSubmit)} title="Giriş Yap" />
    </AuthLayout>
  );
};

export default LoginScreen;
