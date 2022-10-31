import React, {useState, useEffect} from 'react';
import {AuthLayout} from '@layouts';
import api from '@services/api';
import {SafeAreaView, ScrollView} from 'react-native';
import {GameLayout} from '@/layouts';
import {AppButton, AppText, AppBox} from '@/components';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {adsConfig, bannerId} from '@utils/ads';

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
    <SafeAreaView>
      <GameLayout>
        <AppBox flexDirection="column">
          <AppText>Oyun Skoru: {score}</AppText>
          <AppButton onPress={() => move()} title="İlerle"></AppButton>
          <AppButton onPress={() => finish()} title="Oyunu Bitir"></AppButton>
        </AppBox>
      </GameLayout>
      <BannerAd unitId={bannerId} size={BannerAdSize.FLUID} requestOptions={adsConfig} />
    </SafeAreaView>
  );
};

export default PlayGameScreen;
