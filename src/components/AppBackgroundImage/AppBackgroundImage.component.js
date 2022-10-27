import React from 'react';
import {BackgroundImageComponent} from './AppBackgroundImage.style';

const AppBackgroundImage = ({source, resizeMode, width, height, children}) => {
  const getImage = () => {
    if (typeof source === 'string' && source.includes('http')) {
      return {uri: source};
    }

    return source;
  };

  return (
    <BackgroundImageComponent style={resizeMode || 'cover'} width={width} height={height} source={getImage()}>
      {children}
    </BackgroundImageComponent>
  );
};

export default AppBackgroundImage;
