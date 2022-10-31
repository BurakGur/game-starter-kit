import React, {useEffect, useState} from 'react';
import {GameLayout} from '@layouts';
import {ActivityIndicator, StatusBar, Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import api from '@services/api';
import styled from 'styled-components/native';
import {themeState} from '@/store/selectors';
import {AppButton, AppText, ArticleCard} from '@/components';
import {redis} from '@utils/redis';
import {updateUserScore} from '@utils/user';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import {adsConfig, rewardedId} from '@utils/ads';

const rewarded = RewardedAd.createForAdRequest(rewardedId, adsConfig);

const FinishGameScreen = ({navigation, route}) => {
  const user = useRecoilValue(userState);
  const finishScore = route.params.score;
  const isHighScore = finishScore > user.score;
  const highScore = isHighScore ? finishScore : user.score;
  const [loaded, setLoaded] = useState(false);
  StatusBar.setHidden(true);

  useEffect(() => {
    if (isHighScore) {
      redis.set(user.username, finishScore);
      updateUserScore(user, finishScore);
    }

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      navigation.navigate('PlayGame');
    });

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  if (!loaded) {
    rewarded.load();
    return (
      <GameLayout>
        <ActivityIndicator />
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <AppText>Bitirilen Skor: {finishScore}</AppText>
      <AppText>En yüksek skor: {highScore}</AppText>
      <AppButton
        title="Yeniden Oyna"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'PlayGame'}],
          })
        }></AppButton>
      <AppButton title="Devam Et" onPress={() => rewarded.show()}></AppButton>
    </GameLayout>
  );
};

export default FinishGameScreen;
