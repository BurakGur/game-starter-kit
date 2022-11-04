import React from 'react';
import {AppBox, AppButton, AppInput, AppText} from '@/components';
import {GameLayout} from '@/layouts';
import {useForm} from 'react-hook-form';

const GroupRanking = ({route, navigation}) => {
  const groupname = route.groupname;

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
            score: 0,
          };
          collection('Users')
            .add(user)
            .then(async () => {
              setUser(user);
              await saveUser(user);
              navigation.reset({
                index: 0,
                routes: [{name: 'StartGame'}],
              });
            });
        } else {
          Alert.alert('Geçersiz Kullanıcı Adı', 'Bu kullanıcı adı başka bir kullanıcı tarafından kullanılmaktadır.', [
            {text: 'Tamam', onPress: () => console.log('OK Pressed')},
          ]);
        }
      });
  };

  return (
    <GameLayout>
      <AppBox flexDirection="column">
        <AppText>Grup İsmi: {groupname}</AppText>
        <AppInput
          error={errors.username}
          control={control}
          rules={{required: true, minLength: 6}}
          name="username"
          autoCapitalize="none"
          label={t('_formElement.username')}
          placeholder="Nebukadnezar"
        />
        <AppButton onPress={handleSubmit(onSubmit)} title="Kişi Ekle" />
        <AppButton title="Kendini Çıkar" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
      </AppBox>
    </GameLayout>
  );
};

export default GroupRanking;
