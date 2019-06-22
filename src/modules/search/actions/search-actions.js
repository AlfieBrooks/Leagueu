import axios from 'axios';
import errorAlert from '../../../utils/alert-utils';

import {
  FETCH_DDRAGON_VERSION,
  STORE_REGION,
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

export const fetchSummonerIdFailed = (errMessage, errStatusCode) => ({
  type: FETCH_SUMMONER_ID_DATA_FAILED,
  payload: {
    errMessage,
    errStatusCode
  }
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
        console.log(err);
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
        if (err.response) {
          dispatch(fetchSummonerIdFailed(err.message, err.response.status));
          errorAlert(err.message, err.response.status);
        }
        reject(err);
      });
  });
};

export const storeRegion = region => (dispatch) => {
  dispatch({
    type: STORE_REGION,
    payload: region
  });
};
