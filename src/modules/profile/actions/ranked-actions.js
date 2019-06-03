import axios from 'axios';

import { FETCH_RANKED_DATA_STARTED, FETCH_RANKED_DATA_SUCCESS, FETCH_RANKED_DATA_FAILED } from './ranked-action-constants';
import { baseUrl, apiKey } from '../../../utils/api-utils';

export const fetchRankedDataStarted = () => ({
  type: FETCH_RANKED_DATA_STARTED,
});

export const fetchRankedDataSuccess = data => ({
  type: FETCH_RANKED_DATA_SUCCESS,
  payload: data
});

export const fetchRankedDataFailed = err => ({
  type: FETCH_RANKED_DATA_FAILED,
  payload: err
});

export const fetchRankedData = (region, summonerId) => {
  const apiUrl = `${baseUrl}/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
    .replace(/\{region\}/g, region);

  return (dispatch) => {
    dispatch(fetchRankedDataStarted());
    axios.get(apiUrl)
      .then((response) => {
        dispatch(fetchRankedDataSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchRankedDataFailed(err.message));
      });
  };
};
