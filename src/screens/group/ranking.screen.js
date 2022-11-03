import React from 'react';
import {AppBox, AppButton} from '@/components';
import {GameLayout} from '@/layouts';

const GroupRanking = ({navigation}) => {
  return (
    <GameLayout>
      <AppBox>
        <AppButton title="Grup Kur" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
      </AppBox>
    </GameLayout>
  );
};

export default GroupRanking;
