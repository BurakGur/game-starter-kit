import React from 'react';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {View, Text} from 'react-native';

const MyProfileScreen = ({navigation}) => {
  const user = useRecoilValue(userState);

  return (
    <View>
      <Text>My Profile Screen</Text>
      <Text>İsim: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};

export default MyProfileScreen;
