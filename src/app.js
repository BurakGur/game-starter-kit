import React from 'react';
import {RecoilRoot} from 'recoil';
import RouteNavigation from './navigation';
import RecoilActions from '@utils/recoilActions';

const App = () => {
  return (
    <RecoilRoot>
      <RecoilActions />
      <RouteNavigation />
    </RecoilRoot>
  );
};

export default App;
