import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppBox} from '@components';
import {ArticleCardComponent} from './ArticleCard.style';
import AppImage from '../AppImage/AppImage.component';
import AppText from '../AppText/AppText.component';
import {useRecoilValue} from 'recoil';
import {themeState} from '@store/selectors';

const ArticleCard = ({title, description, createdDate, onPress}) => {
  const theme = useRecoilValue(themeState);
  return (
    <TouchableOpacity onPress={onPress}>
      <AppBox alignItems="center" borderRadius={theme.radius.medium} height={'120px'} overflow="hidden">
        <AppImage
          width={'30%'}
          height={'100%'}
          imageName={
            'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          }
        />
        <AppBox
          width={'70%'}
          height={'100%'}
          flexDirection="column"
          justifyContent="center"
          paddingLeft={theme.spaces.x2}
          paddingRight={theme.spaces.x2}>
          <AppText fontFamily={theme.fontFamily.medium}>{title}</AppText>
          <AppText
            fontSize={theme.fontSize.xsmall}
            color={theme.colors.text_03}
            marginTop={theme.spaces.x1}
            lineHeight={theme.lineHeight.x15}>
            {description}
          </AppText>
        </AppBox>
      </AppBox>
    </TouchableOpacity>
  );
};

export default ArticleCard;
