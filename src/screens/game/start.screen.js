import React, {useEffect, useState, useRef} from 'react';
import {GameLayout} from '@layouts';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import api from '@services/api';
import styled from 'styled-components/native';
import {themeState} from '@/store/selectors';
import {AppButton, AppText, ArticleCard} from '@/components';
import {AppState, StyleSheet, View} from 'react-native';
import {AppOpenAd, TestIds, AdEventType} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const StartGameScreen = ({navigation}) => {
  const user = useRecoilValue(userState);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    appOpenAd.load();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        appOpenAd.show();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GameLayout>
      <AppText>Username: {user.username}</AppText>
      <AppText>Score: {user.score}</AppText>
      <AppButton onPress={() => navigation.navigate('PlayGame')} title="Oyuna Başla" />
    </GameLayout>
  );
};

export default StartGameScreen;
