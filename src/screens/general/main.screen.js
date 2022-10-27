import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {customizeState, userState} from '@/store/atoms';
import {getSavedTheme} from '@/utils/theme';

const MainScreen = ({navigation}) => {
  const [, setUser] = useRecoilState(userState);
  const [, setCustomize] = useRecoilState(customizeState);

  useEffect(() => {
    const initApp = async () => {
      const token = await AsyncStorage.getItem('token');
      const savedUser = await AsyncStorage.getItem('user');
      const theme = await getSavedTheme();

      setCustomize({theme});

      let routeName = 'ArticleList';

      if (!token) {
        routeName = 'Welcome';
      } else {
        setUser(JSON.parse(savedUser));
      }
      navigation.reset({
        index: 0,
        routes: [{name: routeName}],
      });
      SplashScreen.hide();
    };

    initApp();
  }, [navigation, setCustomize, setUser]);

  return (
    <View style={{flex: 1}}>
      <Text>Main Screen</Text>
    </View>
  );
};

export default MainScreen;
