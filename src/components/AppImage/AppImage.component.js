import React from 'react';
import {ImageComponent} from './AppImage.style';

const AppImage = ({imageName, resizeMode, width, height, ...props}) => {
  const getImage = () => {
    if (typeof imageName === 'string' && imageName.includes('http')) {
      return {uri: imageName};
    }

    return imageName;
  };

  return (
    <ImageComponent style={resizeMode || 'contain'} width={width} height={height} source={getImage()} {...props} />
  );
};

export default AppImage;
