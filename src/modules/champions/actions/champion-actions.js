import axios from 'axios';

import {
  FETCH_CHAMPION_DATA_STARTED,
  FETCH_CHAMPION_DATA_SUCCESS,
  FETCH_CHAMPION_DATA_FAILED,
  CLEAR_CHAMPION_DATA,
} from './champion-action-constants';
import constructApiUrl from '../../../utils/api-utils';

export const fetchChampionDataStarted = () => ({
  type: FETCH_CHAMPION_DATA_STARTED,
});

export const fetchChampionDataSuccess = data => ({
  type: FETCH_CHAMPION_DATA_SUCCESS,
  payload: data
});

export const fetchChampionDataFailed = err => ({
  type: FETCH_CHAMPION_DATA_FAILED,
  payload: err
});

export const fetchChampionData = (region, summonerId) => {
  const apiUrl = constructApiUrl(region, `/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`);

  return (dispatch) => {
    dispatch(fetchChampionDataStarted());
    axios.get(apiUrl)
      .then((response) => {
        dispatch(fetchChampionDataSuccess(response.data.slice(0, 3)));
      })
      .catch((err) => {
        dispatch(fetchChampionDataFailed(err.message));
      });
  };
};

export const clearChampionData = () => dispatch => (
  dispatch({
    type: CLEAR_CHAMPION_DATA
  })
);
