import React from 'react';
import {AppBox, AppButton} from '@/components';
import {GameLayout} from '@/layouts';

const GroupRanking = ({navigation}) => {
  return (
    <GameLayout>
      <AppBox flexDirection="column">
        <AppButton title="Kişi Ekle" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
        <AppButton title="Kendini Çıkar" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
      </AppBox>
    </GameLayout>
  );
};

export default GroupRanking;
