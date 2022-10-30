const {atom} = require('recoil');
import LightTheme from '@theme/light';

export const customizeState = atom({
  key: 'Customize',
  default: {
    theme: LightTheme,
  },
});

export const userState = atom({
  key: 'User',
  default: {
    username: '',
    os: '',
    version: '',
    createdDate: '',
    score: 0,
  },
});
