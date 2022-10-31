import {ScrollView, View} from 'react-native';
import styled from 'styled-components';

export const GameLayout = styled(ScrollView)`
  padding: ${({theme}) => theme.layout.padding};
  width: 100%;
  background-color: ${({theme}) => theme.colors.bg_01};
  height: 90%;
`;
