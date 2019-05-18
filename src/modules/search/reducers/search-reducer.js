import { STORE_SUMMONER_NAME, FETCH_SUMMONER_ID_DATA } from '../actions/search-action-constants';

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case STORE_SUMMONER_NAME:
      return { ...state, summonerName: action.data };
    case FETCH_SUMMONER_ID_DATA:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default searchReducer;
