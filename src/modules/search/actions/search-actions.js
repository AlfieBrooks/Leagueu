import axios from 'axios';

import {
  STORE_SUMMONER_NAME,
  FETCH_SUMMONER_ID_DATA_STARTED,
  FETCH_SUMMONER_ID_DATA_SUCCESS,
  FETCH_SUMMONER_ID_DATA_FAILED
} from './search-action-constants';
import { baseUrl, apiKey } from '../../../utils/api-utils';

export const fetchSummonerIdStarted = () => ({
  type: FETCH_SUMMONER_ID_DATA_STARTED,
});

export const fetchSummonerIdSuccess = data => ({
  type: FETCH_SUMMONER_ID_DATA_SUCCESS,
  payload: data
});

export const fetchSummonerIdFailed = err => ({
  type: FETCH_SUMMONER_ID_DATA_FAILED,
  payload: err
});

export const fetchSummonerId = (region, summonerName) => {
  const apiUrl = `${baseUrl}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
    .replace(/\{region\}/g, region);

  return dispatch => new Promise((resolve, reject) => {
    dispatch(fetchSummonerIdStarted());
    axios.get(apiUrl)
      .then((response) => {
        dispatch(fetchSummonerIdSuccess(response.data));
        resolve(response);
      })
      .catch((err) => {
        dispatch(fetchSummonerIdFailed(err.message));
        reject(err);
      });
  });
};

export const storeSummonerName = summonerName => (dispatch) => {
  dispatch({
    type: STORE_SUMMONER_NAME,
    payload: summonerName
  });
};
