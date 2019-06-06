import {
  FETCH_RANKED_DATA_STARTED,
  FETCH_RANKED_SOLO_5x5_DATA_SUCCESS, // eslint-disable-line camelcase
  FETCH_RANKED_FLEX_SR_DATA_SUCCESS,
  FETCH_RANKED_DATA_FAILED
} from '../actions/ranked-action-constants';
import rankedTransformer from '../transformers/ranked-transfomer';
import rankedQueueTypes from '../../../utils/ranked-queue-type';

const initialState = {
  loading: false,
  error: null,
  rankedSolo: {
    tier: rankedQueueTypes.UNRANKED
  },
  rankedFlex: {
    tier: rankedQueueTypes.UNRANKED
  }
};

const rankedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANKED_DATA_STARTED:
      return {
        ...state,
        loading: true,
      };
    // eslint-disable-next-line camelcase
    case FETCH_RANKED_SOLO_5x5_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        rankedSolo: rankedTransformer(action.payload),
      };
    case FETCH_RANKED_FLEX_SR_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        rankedFlex: rankedTransformer(action.payload),
      };
    case FETCH_RANKED_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default rankedReducer;
