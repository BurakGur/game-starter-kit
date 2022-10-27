import React from 'react';
import {AuthLayout} from '@/layouts';
import {AppButton, MenuListItem} from '@/components';
import {exitUser} from '@/utils/user';

const MenuScreen = ({navigation}) => {
  const handleLogout = async () => {
    await exitUser();
    navigation.navigate('Welcome');
  };

  const goToMyProfile = () => {
    navigation.navigate('MyProfile');
  };

  return (
    <AuthLayout>
      <MenuListItem></MenuListItem>
      <AppButton title="Profilim" onPress={() => goToMyProfile()} />
      <AppButton title="Çıkış Yap" onPress={() => handleLogout()} />
    </AuthLayout>
  );
};

export default MenuScreen;
