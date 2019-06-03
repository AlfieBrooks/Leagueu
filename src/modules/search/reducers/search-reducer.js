import {
  STORE_SUMMONER_NAME,
  FETCH_SUMMONER_ID_DATA_STARTED,
  FETCH_SUMMONER_ID_DATA_SUCCESS,
  FETCH_SUMMONER_ID_DATA_FAILED
} from '../actions/search-action-constants';
import searchTransformer from '../transformers/search-transfomer';

const initialState = {
  loading: false,
  error: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SUMMONER_NAME:
      return { ...state, searchSummonerName: action.payload };
    case FETCH_SUMMONER_ID_DATA_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUMMONER_ID_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...searchTransformer(action.payload)
      };
    case FETCH_SUMMONER_ID_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default searchReducer;
