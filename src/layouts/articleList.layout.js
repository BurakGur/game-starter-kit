import {ScrollView} from 'react-native';
import styled from 'styled-components';

export const ArticleListLayout = styled(ScrollView)`
  flex: 1;
  padding: ${({theme}) => theme.layout.padding};
  width: 100%;
  background-color: ${({theme}) => theme.colors.bg_01};
`;
