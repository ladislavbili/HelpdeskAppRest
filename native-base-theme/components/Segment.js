import { Platform } from 'react-native';

import variable from './../variables/platform';

export default (variables = variable) => {
  const platformStyle = variables.platformStyle;
  const platform = variables.platform;

  const segmentTheme = {
    height: 45,
    borderBottomWidth: variables.borderWidth,
    borderColor: variables.segmentBorderColorMain,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: variables.segmentBackgroundColor,
    'NativeBase.Button': {
      alignSelf: 'center',
      borderRadius: 0,
      paddingHorizontal: 25,
      height: 30,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: variables.segmentBorderColor,
      elevation: 0,
      '.active': {
        backgroundColor: variables.segmentActiveBackgroundColor,
        'NativeBase.Text': {
          color: variables.segmentActiveTextColor
        }
      },
      '.first': {
        borderTopLeftRadius: undefined,
        borderBottomLeftRadius: undefined,
        borderRightWidth: 0
      },
      '.last': {
        borderTopRightRadius: undefined,
        borderBottomRightRadius: undefined,
        borderLeftWidth: 0
      },
      'NativeBase.Text': {
        color: variables.segmentTextColor,
        fontSize: 14
      }
    }
  };


  return segmentTheme;
};
