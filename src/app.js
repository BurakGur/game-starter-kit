import React from 'react';
import {RecoilRoot} from 'recoil';
import RouteNavigation from './navigation';

const App = () => {
  return (
    <RecoilRoot>
      <RouteNavigation />
    </RecoilRoot>
  );
};

export default App;
