import {TextInput, Text, View} from 'react-native';
import styled from 'styled-components';

export const InputComponent = styled(TextInput)`
  height: ${({theme}) => theme.inputSize.height};
  border-width: 2px;
  border-color: ${({theme, error, focused}) => {
    if (error) {
      return theme.colors.danger_01;
    }
    if (focused) {
      return theme.colors.border_03;
    }
    return theme.colors.border_01;
  }};
  border-style: solid;
  border-radius: ${({theme}) => theme.radius.medium};
  color: ${({theme}) => theme.colors.text_02};
  font-size: ${({theme}) => theme.fontSize.regular};
  padding-left: ${({theme}) => theme.inputSize.padding};
  padding-right: ${({theme}) => theme.inputSize.padding};
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

export const LabelComponent = styled(Text)`
  color: ${({theme, error, focused}) => {
    if (error) {
      return theme.colors.danger_01;
    }
    if (focused) {
      return theme.colors.text_02;
    }
    return theme.colors.text_04;
  }};
  margin-bottom: ${({theme}) => theme.spaces.x1};
  font-family: ${({theme}) => theme.fontFamily.semiBold};
`;

export const InputContainer = styled(View)`
  width: ${({width}) => width || '100%'};
  margin-bottom: ${({theme}) => theme.spaces.x3};
`;
