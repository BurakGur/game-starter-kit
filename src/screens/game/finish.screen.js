import React, {useEffect, useState} from 'react';
import {GameLayout} from '@layouts';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import api from '@services/api';
import styled from 'styled-components/native';
import {themeState} from '@/store/selectors';
import {AppButton, AppText, ArticleCard} from '@/components';
import {redis} from '@utils/redis';
import {updateUserScore} from '@utils/user';

const FinishGameScreen = ({navigation, route}) => {
  const user = useRecoilValue(userState);
  const finishScore = route.params.score;
  const isHighScore = finishScore > user.score;
  const highScore = isHighScore ? finishScore : user.score;

  useEffect(() => {
    if (isHighScore) {
      redis.set(user.username, finishScore);
      updateUserScore(user, finishScore);
    }
  }, []);

  return (
    <GameLayout>
      <AppText>Bitirilen Skor: {finishScore}</AppText>
      <AppText>En yüksek skor: {highScore}</AppText>
    </GameLayout>
  );
};

export default FinishGameScreen;
