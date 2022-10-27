import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppBox} from '@components';
import {ArticleCardComponent} from './MenuListItem.style';
import AppImage from '../AppImage/AppImage.component';
import AppText from '../AppText/AppText.component';
import {useRecoilValue} from 'recoil';
import {themeState} from '@store/selectors';
import {ChevronLeft, SpinnerThirdIcon} from '@/icons';

const MenuListItem = ({title, description, createdDate, onPress}) => {
  const theme = useRecoilValue(themeState);
  return (
    <TouchableOpacity onPress={onPress}>
      <AppBox alignItems="center" height={'120px'} overflow="hidden">
        <SpinnerThirdIcon width="24" height="24" color={theme.colors.text_02} />
        <AppText marginLeft={theme.spaces.x2} flex={1} color={theme.colors.text_02}>
          Profilim
        </AppText>
        <ChevronLeft width="18" height="18" color={theme.colors.text_02} />
      </AppBox>
    </TouchableOpacity>
  );
};

export default MenuListItem;
