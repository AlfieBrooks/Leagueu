import axios from 'axios';

import { STORE_SUMMONER_NAME, FETCH_SUMMONER_ID_DATA } from './search-action-constants';
import { baseUrl, apiKey } from '../../../utils/api-utils';

export const fetchSummonerId = (region, summonerName) => {
  const apiUrl = `${baseUrl}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
    .replace(/\{region\}/g, region);

  return dispatch => axios.get(apiUrl)
    .then((response) => {
      dispatch({
        type: FETCH_SUMMONER_ID_DATA,
        payload: response.data
      });
    })
    .catch((e) => {
      throw (e);
    });
};

export const storeSummonerName = summonerName => (dispatch) => {
  dispatch({
    type: STORE_SUMMONER_NAME,
    payload: summonerName
  });
};
