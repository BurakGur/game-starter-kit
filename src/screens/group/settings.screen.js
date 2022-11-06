import React, {useEffect, useState} from 'react';
import {AppBox, AppButton, AppIf, AppInput, AppText} from '@/components';
import {GameLayout} from '@/layouts';
import {useForm} from 'react-hook-form';
import t from '@/locale';
import {collection} from '@/utils/firebase';

const GroupRanking = ({route, navigation}) => {
  const groupName = route.params.groupName;
  const [group, setGroup] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({});

  useEffect(() => {
    collection('Groups')
      .where('groupName', '==', groupName)
      .get()
      .then(async snapshot => {
        snapshot.forEach(async element => {
          setGroup(element.data());
        });
      });
  }, []);

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
      <AppIf condition={group}>
        <AppBox flexDirection="column">
          <AppText>Grup İsmi: {group.groupNick}</AppText>
          {group.users.length <= 6 ? (
            <AppInput
              error={errors.username}
              control={control}
              rules={{required: true, minLength: 6}}
              name="username"
              autoCapitalize="none"
              label={t('_formElement.username')}
              placeholder="Nebukadnezar"
            />
          ) : (
            <AppText>Daha fazla gruba kişi ekleyemezsiniz.</AppText>
          )}
          <AppButton onPress={handleSubmit(onSubmit)} title="Kişi Ekle" />
          <AppButton title="Kendini Çıkar" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
          {group.users.map(groupUser => (
            <AppText key={groupUser.username}>
              {groupUser.username} - {groupUser.isActive ? 'Aktif' : 'Onay Bekleniyor'}
            </AppText>
          ))}
        </AppBox>
      </AppIf>
    </GameLayout>
  );
};

export default GroupRanking;
