import { FETCH_RANKED_DATA_STARTED, FETCH_RANKED_DATA_SUCCESS, FETCH_RANKED_DATA_FAILED } from '../actions/ranked-action-constants';
import rankedTransformer from '../transformers/ranked-transfomer';

const initialState = {
  loading: false,
  error: null,
  ranks: []
};

const rankedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANKED_DATA_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RANKED_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ranks: action.payload.map(rankedTransformer)
      };
    case FETCH_RANKED_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default rankedReducer;
