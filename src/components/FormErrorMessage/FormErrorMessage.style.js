import {Text} from 'react-native';
import styled from 'styled-components';

export const FormErrorMessageComponent = styled(Text)`
  margin-top: ${({theme}) => theme.spaces.x1};
  color: ${({theme}) => theme.colors.danger_01};
  font-size: ${({theme}) => theme.fontSize.small};
`;
