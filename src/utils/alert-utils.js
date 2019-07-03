import { Alert } from 'react-native';

const errorCodeMap = {
  400: 'Bad request, try again later',
  401: 'API Key not set, try again later',
  403: 'API Key not authorised, try again later',
  404: 'Summoner not found',
  415: 'Unsupported content type sent, try again later',
  429: 'Our API Key has exceeded the rate limit, try again later',
  500: 'Internal server error, try again later',
  503: 'The Riot API is down, try again later'
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
