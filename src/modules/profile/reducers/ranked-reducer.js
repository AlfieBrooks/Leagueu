import {
  FETCH_RANKED_DATA_STARTED,
  FETCH_RANKED_SOLO_5x5_DATA_SUCCESS, // eslint-disable-line camelcase
  FETCH_RANKED_FLEX_SR_DATA_SUCCESS,
  FETCH_RANKED_FLEX_TT_DATA_SUCCESS,
  FETCH_RANKED_DATA_FAILED,
  CLEAR_RANKED_DATA,
} from '../actions/ranked-action-constants';
import rankedTransformer from '../transformers/ranked-transfomer';
import rankedQueueTypes from '../../../utils/constants/ranked-queue-type';
import rankTypes from '../../../utils/constants/rank-types';

const initialState = {
  loading: false,
  error: null,
  rankedSolo: {
    queueType: rankedQueueTypes.RANKED_SOLO_5x5,
    tier: rankTypes.UNRANKED
  },
  rankedFlexSR: {
    queueType: rankedQueueTypes.RANKED_FLEX_SR,
    tier: rankTypes.UNRANKED
  },
  rankedFlexTT: {
    queueType: rankedQueueTypes.RANKED_FLEX_TT,
    tier: rankTypes.UNRANKED
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
        rankedFlexSR: rankedTransformer(action.payload),
      };
    case FETCH_RANKED_FLEX_TT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        rankedFlexTT: rankedTransformer(action.payload),
      };
    case FETCH_RANKED_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_RANKED_DATA:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default rankedReducer;
