import {Text} from 'react-native';
import styled from 'styled-components';

export const TextComponent = styled(Text)`
  flex: ${props => props.flex || 'none'};
  font-size: ${({fontSize, theme}) => fontSize || theme.fontSize.regular};
  font-family: ${({fontFamily, theme}) => fontFamily || theme.fontFamily.regular};
  color: ${({color, theme}) => color || theme.colors.text_01};
  text-align: ${({textAlign}) => textAlign || 'left'};
  line-height: ${({lineHeight, theme, fontSize}) => lineHeight || fontSize || theme.fontSize.regular};
  margin-top: ${({marginTop}) => marginTop || 0};
  margin-bottom: ${({marginBottom}) => marginBottom || 0};
  margin-left: ${({marginLeft}) => marginLeft || 0};
  margin-right: ${({marginRight}) => marginRight || 0};
  padding-top: ${({paddingTop}) => paddingTop || 0};
  padding-bottom: ${({paddingBottom}) => paddingBottom || 0};
  padding-left: ${({paddingLeft}) => paddingLeft || 0};
  padding-right: ${({paddingRight}) => paddingRight || 0};
  background-color: ${({backgroundColor}) => backgroundColor || 'transparent'};
`;
