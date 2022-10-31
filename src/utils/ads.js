import {TestIds} from 'react-native-google-mobile-ads';

export const appOpenId = __DEV__ ? TestIds.APP_OPEN : process.env.APP_OPEN_ID;
export const bannerId = __DEV__ ? TestIds.BANNER : process.env.BANNER_ID;
export const rewardedId = __DEV__ ? TestIds.REWARDED : process.env.REWARDED_ID;

export const adsConfig = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing', 'technologhy', 'computer'],
};
