import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components';
import {useRecoilValue} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {customizeState} from '@store/atoms';
import {Register, Welcome} from '@screens/auth';
import {ArticleDetail, GameStart} from '@/screens/game';
import {Menu} from '@screens/shared/';
import {Main} from '@screens/general';
import {Text, TouchableOpacity} from 'react-native';
import {MyProfile} from '@/screens/profile';
import {BarsSort, ChevronLeft, MagnifyingGlass} from '@/icons';
import {themeState} from '@/store/selectors';

const Stack = createNativeStackNavigator();

const RouteNavigation = () => {
  const customize = useRecoilValue(customizeState);
  const theme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={customize.theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main" screenOptions={{animation: 'none'}}>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={({navigation}) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft width="18" height="18" color={theme.colors.text_03} />
                  </TouchableOpacity>
                ),
                headerTitle: '',
              })}
            />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen
              name="GameStart"
              component={GameStart}
              options={({navigation}) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <BarsSort width="20" height="20" color={theme.colors.text_02} />
                  </TouchableOpacity>
                ),
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <MagnifyingGlass width="20" height="20" color={theme.colors.text_02} />
                  </TouchableOpacity>
                ),
                headerTitle: '',
              })}
            />
            <Stack.Screen
              name="ArticleDetail"
              component={ArticleDetail}
              options={({navigation}) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <Text>Menü</Text>
                  </TouchableOpacity>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default RouteNavigation;
