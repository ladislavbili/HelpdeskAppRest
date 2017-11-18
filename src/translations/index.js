import I18n from 'react-native-i18n';
import en from './en';
import sk from './sk';

//creates language packs for the application
I18n.fallbacks = true;
I18n.translations = {
  en,
  sk
};

export default I18n;
