import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LightTheme, DarkTheme} from '@/theme';

export const getSavedTheme = async () => {
  const colorScheme = Appearance.getColorScheme();
  const savedTheme = (await AsyncStorage.getItem('theme')) || colorScheme || 'light';
  const theme = savedTheme === 'light' ? DarkTheme : DarkTheme;
  return theme;
};
