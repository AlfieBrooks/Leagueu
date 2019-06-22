import {
  FETCH_CHAMPION_DATA_STARTED,
  FETCH_CHAMPION_DATA_SUCCESS,
  FETCH_CHAMPION_DATA_FAILED,
  CLEAR_CHAMPION_DATA,
} from '../actions/champion-action-constants';
import championTransformer from '../transformers/champion-transfomer';

const initialState = {
  loading: false,
  error: null,
  champions: []
};

const championReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAMPION_DATA_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CHAMPION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        champions: action.payload.map(championTransformer),
      };
    case FETCH_CHAMPION_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_CHAMPION_DATA:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default championReducer;
