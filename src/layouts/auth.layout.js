import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

export const AuthLayout = styled(SafeAreaView)`
  flex: 1;
  padding: ${({theme}) => theme.layout.padding};
  flex-direction: ${({flexDirection}) => flexDirection || 'column'};
  align-items: ${({alignItems}) => alignItems || 'center'};
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
  width: 100%;
`;
