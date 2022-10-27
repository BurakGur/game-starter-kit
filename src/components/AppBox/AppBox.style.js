import {View} from 'react-native';
import styled from 'styled-components';

export const BoxComponent = styled(View)`
  display: flex;
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'center'};
  flex-direction: ${props => props.flexDirection || 'row'};
  flex: ${props => props.flex || 'none'};
  margin-left: ${props => props.marginLeft || 0};
  margin-right: ${props => props.marginRight || 0};
  margin-top: ${props => props.marginTop || 0};
  margin-bottom: ${props => props.marginBottom || 0};
  padding-left: ${props => props.paddingLeft || 0};
  padding-right: ${props => props.paddingRight || 0};
  padding-top: ${props => props.paddingTop || 0};
  padding-bottom: ${props => props.paddingBottom || 0};
  width: ${props => props.width || '100%'};
  max-width: ${props => props.maxWidth || '100%'};
  height: ${props => props.height || 'auto'};
  border-radius: ${props => props.borderRadius || 0};
  overflow: ${props => props.overflow || 'visible'};
`;
