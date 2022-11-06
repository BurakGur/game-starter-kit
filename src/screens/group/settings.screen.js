import React, {useEffect, useState} from 'react';
import {AppBox, AppButton, AppIf, AppInput, AppText} from '@/components';
import {GameLayout} from '@/layouts';
import {useForm} from 'react-hook-form';
import t from '@/locale';
import {collection} from '@/utils/firebase';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {Alert} from 'react-native';

const GroupRanking = ({route, navigation}) => {
  const groupName = route.params.groupName;
  const user = useRecoilValue(userState);
  const [group, setGroup] = useState(null);
  const [docId, setDocId] = useState();
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
          setDocId(element.id);
          setGroup(element.data());
        });
      });
  }, []);

  const onSubmit = async data => {
    const username = data.username;
    if (username !== user.username) {
      const checkInGroup = group.users.find(groupUser => groupUser.username === username);
      if (!checkInGroup) {
        collection('Users')
          .where('username', '==', data.username)
          .get()
          .then(async snapshot => {
            if (!snapshot.empty) {
              const groupWithNewUser = {...group};
              groupWithNewUser.users.push({
                username: data.username,
                isActive: false,
              });
              setGroup(groupWithNewUser);
              reset();
              collection('Groups').doc(docId).update(groupWithNewUser);
            } else {
              Alert.alert('Geçersiz Kullanıcı Adı', 'Böyle bir kullanıcı adı kullanılmıyor', [
                {text: 'Tamam', onPress: () => console.log('OK Pressed')},
              ]);
            }
          });
      } else {
        Alert.alert('Ee bu var', 'Kardeş kör müsün eklemişsiniz zaten', [
          {text: 'Yine yakalandım', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } else {
      Alert.alert('Güzel deneme', 'Aaa bu sen değil misin ya?', [
        {text: ' Yakalandım', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const removeUser = () => {
    const groupWithoutUser = {...group};
    const userIndex = groupWithoutUser.users.findIndex(groupUser => groupUser.username === user.username);
    groupWithoutUser.users.splice(userIndex, 1);
    collection('Groups').doc(docId).update(groupWithoutUser);
    navigation.reset({
      index: 0,
      routes: [{name: 'GroupRanking'}],
    });
  };

  return (
    <GameLayout>
      {group ? (
        <AppBox flexDirection="column">
          <AppText>Grup İsmi: {group.groupName}</AppText>
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
          <AppButton title="Kendini Çıkar" onPress={removeUser}></AppButton>
          {group.users.map(groupUser => (
            <AppText key={groupUser.username}>
              {groupUser.username} - {groupUser.isActive ? 'Aktif' : 'Onay Bekleniyor'}
            </AppText>
          ))}
        </AppBox>
      ) : (
        <></>
      )}
    </GameLayout>
  );
};

export default GroupRanking;
