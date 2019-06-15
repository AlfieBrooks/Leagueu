import axios from 'axios';

import {
  FETCH_DDRAGON_VERSION,
  STORE_SUMMONER_NAME,
  FETCH_SUMMONER_ID_DATA_STARTED,
  FETCH_SUMMONER_ID_DATA_SUCCESS,
  FETCH_SUMMONER_ID_DATA_FAILED
} from './search-action-constants';
import constructApiUrl from '../../../utils/api-utils';

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

export const fetchDdragonVersionSuccess = version => ({
  type: FETCH_DDRAGON_VERSION,
  payload: version
});

export const fetchDdragonVersion = () => {
  const apiUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';

  return (dispatch) => {
    axios.get(apiUrl)
      .then((response) => {
        dispatch(fetchDdragonVersionSuccess(response.data[0]));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const fetchSummonerId = (region, summonerName) => {
  const apiUrl = constructApiUrl(region, `/lol/summoner/v4/summoners/by-name/${summonerName}`);

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
