import {
  Alert
} from 'react-native';

export default function errorAlert(errorMessage) {
  return (
    Alert.alert(
      'Whoops!',
      errorMessage || undefined,
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    )
  );
}
