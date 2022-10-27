import {ImageBackground} from 'react-native';
import styled from 'styled-components';

export const BackgroundImageComponent = styled(ImageBackground)`
  height: ${({height}) => height || '100%'};
  width: ${({width}) => width || '100%'};
  flex: ${({flex}) => flex || 1};
`;
