const {selector} = require('recoil');
import {customizeState} from '@store/atoms';

export const themeState = selector({
  key: 'themeState',
  get: ({get}) => {
    const customize = get(customizeState);

    return customize.theme;
  },
});
