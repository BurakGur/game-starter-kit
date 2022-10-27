import {Image} from 'react-native';
import styled from 'styled-components';

export const ImageComponent = styled(Image)`
  height: ${({height}) => height || '100px'};
  width: ${({width}) => width || '100%'};
  min-width: ${({minWidth}) => minWidth || '100px'};
  border-radius: ${({borderRadius}) => borderRadius || '0'};
`;
