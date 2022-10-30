import React, {useState, useEffect} from 'react';
import {AuthLayout} from '@layouts';
import api from '@services/api';
import {ScrollView} from 'react-native';
import {GameLayout} from '@/layouts';
import {AppButton, AppText} from '@/components';

const PlayGameScreen = ({route, navigation}) => {
  const [score, setScore] = useState(0);

  const move = () => {
    setScore(score => score + 1);
  };

  const finish = () => {
    navigation.navigate('FinishGame', {
      score,
    });
  };

  return (
    <GameLayout>
      <AppText>Oyun Skoru: {score}</AppText>
      <AppButton onPress={() => move()} title="İlerle"></AppButton>
      <AppButton onPress={() => finish()} title="Oyunu Bitir"></AppButton>
    </GameLayout>
  );
};

export default PlayGameScreen;
