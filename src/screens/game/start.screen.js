import React, {useEffect, useRef} from 'react';
import {GameLayout} from '@layouts';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {AppButton, AppText} from '@/components';
import {AppState} from 'react-native';
import {AppOpenAd} from 'react-native-google-mobile-ads';
import {adsConfig, appOpenId} from '@utils/ads';

const appOpenAd = AppOpenAd.createForAdRequest(appOpenId, adsConfig);

const StartGameScreen = ({navigation}) => {
  const user = useRecoilValue(userState);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    appOpenAd.load();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        try {
          appOpenAd.show();
        } catch {
          console.log('error');
        }
      }

      appState.current = nextAppState;
      appOpenAd.load();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GameLayout>
      <AppText>Username: {user.username}</AppText>
      <AppText>Score: {user.score}</AppText>
      <AppButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'PlayGame', params: 'hello'}],
          })
        }
        title="Oyuna Başla"
      />
      <AppButton title="Puanlama" onPress={() => navigation.navigate('GroupRanking')}></AppButton>
      <AppButton title="Grup Davetleri" onPress={() => navigation.navigate('GroupInvites')}></AppButton>
    </GameLayout>
  );
};

export default StartGameScreen;
