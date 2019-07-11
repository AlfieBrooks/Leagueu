import { AsyncStorage } from 'react-native';

import errorAlert from './alert-utils';

export const storePersistantData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    errorAlert(err);
  }
};

export const getPersistantData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (err) {
    errorAlert(err);
  }
  return null;
};
