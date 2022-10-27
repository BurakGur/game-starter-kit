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
    name: '',
    email: '',
    _id: '',
  },
});
