import { STORE_SUMMONER_NAME, FETCH_SUMMONER_ID_DATA } from '../actions/search-action-constants';
import searchTransformer from '../transformers/search-transfomer';

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case STORE_SUMMONER_NAME:
      return { ...state, searchSummonerName: action.payload };
    case FETCH_SUMMONER_ID_DATA:
      return {
        ...state,
        ...searchTransformer(action.payload)
      };
    default:
      return state;
  }
};

export default searchReducer;
