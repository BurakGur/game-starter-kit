import React, {useEffect, useState} from 'react';
import {GameLayout} from '@layouts';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import api from '@services/api';
import styled from 'styled-components/native';
import {themeState} from '@/store/selectors';
import {AppButton, AppText, ArticleCard} from '@/components';

const StartGameScreen = ({navigation}) => {
  const user = useRecoilValue(userState);

  return (
    <GameLayout>
      <AppText>Username: {user.username}</AppText>
      <AppText>Score: {user.score}</AppText>
      <AppButton onPress={() => navigation.navigate('PlayGame')} title="Oyuna Başla" />
    </GameLayout>
  );
};

export default StartGameScreen;
