import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const radioTheme = {
      '.selected': {
        'NativeBase.IconNB': {
          color: variables.radioSelectedColorAndroid,
          lineHeight: variables.radioBtnLineHeight,
          height: undefined,
        },
      },
      'NativeBase.IconNB': {
        color: undefined,
        lineHeight: variables.radioBtnLineHeight,
        fontSize: variables.radioBtnSize,
      },
  };


  return radioTheme;
};
