import I18n from 'react-native-i18n';
import tr from './tr';

I18n.fallbacks = true;

I18n.translations = {
  tr,
};

const t = (key, params) => {
  return I18n.t(key, params);
};

export default t;
