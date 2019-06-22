import { Alert } from 'react-native';

const errorCodeMap = {
  403: 'API Key not authorised',
  404: 'Summoner not found',
  500: 'Internal server error'
};

export default function errorAlert(errMessage, errStatusCode) {
  return (
    Alert.alert(
      'Whoops!',
      errorCodeMap[errStatusCode] || errMessage,
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    )
  );
}
