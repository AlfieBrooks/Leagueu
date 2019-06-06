import axios from 'axios';

import {
  FETCH_RANKED_DATA_STARTED, FETCH_RANKED_DATA_FAILED
} from './ranked-action-constants';
import constructApiUrl from '../../../utils/api-utils';

export const fetchRankedDataStarted = () => ({
  type: FETCH_RANKED_DATA_STARTED,
});

export const fetchRankedDataSuccess = data => ({
  type: `FETCH_${data.queueType}_DATA_SUCCESS`,
  payload: data
});

export const fetchRankedDataFailed = err => ({
  type: FETCH_RANKED_DATA_FAILED,
  payload: err
});

export const fetchRankedData = (region, summonerId) => {
  const apiUrl = constructApiUrl(region, `/lol/league/v4/entries/by-summoner/${summonerId}`);

  return (dispatch) => {
    dispatch(fetchRankedDataStarted());
    axios.get(apiUrl)
      .then((response) => {
        response.data.map(data => dispatch(fetchRankedDataSuccess(data)));
      })
      .catch((err) => {
        dispatch(fetchRankedDataFailed(err.message));
      });
  };
};
