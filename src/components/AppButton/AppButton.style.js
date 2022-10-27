import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';

export const ButtonComponent = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.colors.bg_03};
  border-radius: ${({theme}) => theme.radius.medium};
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border_02};
  border-style: solid;
  height: ${({theme}) => theme.buttonSize.height};
  width: ${({width}) => width || '100%'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonTextComponent = styled(Text)`
  color: ${({theme}) => theme.colors.text_06};
  font-weight: 600;
  font-size: ${({theme}) => theme.fontSize.regular};
  font-family: ${({theme}) => theme.fontFamily.semiBold};
`;
