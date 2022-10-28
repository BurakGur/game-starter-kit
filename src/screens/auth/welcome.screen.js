import React, {useEffect} from 'react';
import {AppButton} from '@components';
import {AuthLayout} from '@layouts';
import {AppBox, AppText, AppBackgroundImage} from '@/components';
import {useRecoilValue} from 'recoil';
import {themeState} from '@/store/selectors';
import t from '@locale';
import {getCollection} from '@utils/firebase';
import {redis} from '@utils/redis';

const WelcomeScreen = ({navigation}) => {
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    const init = async () => {
      getCollection('Users').then(snapshot => {
        console.log(snapshot.docs[0].data());
      });
      await redis.set('key', 'value');
      let data = await redis.get('foo');
      console.log(data);
    };
    init();
  }, []);

  return (
    <AppBox flex={1}>
      <AppBackgroundImage source={require('@assets/welcome3.jpg')}>
        <AuthLayout justifyContent="flex-end" alignItems="center">
          <AppBox marginBottom={theme.spaces.x4} flex={1}>
            <AppText fontSize={theme.fontSize.title} color={theme.colors.text_06} fontFamily={theme.fontFamily.bold}>
              fabula
            </AppText>
            <AppText fontSize={theme.fontSize.title} color={theme.colors.text_07} fontFamily={theme.fontFamily.bold}>
              .
            </AppText>
          </AppBox>
          <AppBox marginBottom={theme.spaces.x8} flex={1}>
            <AppText
              fontSize={theme.fontSize.small}
              color={theme.colors.text_06}
              textAlign="center"
              marginRight={theme.spaces.x5}
              marginLeft={theme.spaces.x5}
              lineHeight={theme.lineHeight.x20}
              width="auto">
              Aliquip adipisicing velit dolor quis labore adipisicing minim ad commodo id mollit laboris aliqua.
            </AppText>
          </AppBox>
          <AppButton onPress={() => navigation.navigate('Login')} title={t('_welcomeScreen.getStarted')} />
        </AuthLayout>
      </AppBackgroundImage>
    </AppBox>
  );
};

export default WelcomeScreen;
