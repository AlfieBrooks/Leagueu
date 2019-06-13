import {
  FETCH_DDRAGON_VERSION,
  STORE_SUMMONER_NAME,
  STORE_SUMMONER_INFO,
  FETCH_SUMMONER_ID_DATA_STARTED,
  FETCH_SUMMONER_ID_DATA_SUCCESS,
  FETCH_SUMMONER_ID_DATA_FAILED
} from '../actions/search-action-constants';
import summonerInfoTransformer from '../transformers/summoner-info-transfomer';

const initialState = {
  loading: false,
  error: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DDRAGON_VERSION:
      return { ...state, ddragonVersion: action.payload };
    case STORE_SUMMONER_NAME:
      return { ...state, searchSummonerName: action.payload };
    case STORE_SUMMONER_INFO:
      return {
        ...state,
        ...action.payload
      };
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
        ...summonerInfoTransformer(action.payload)
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
