import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from '../actions/favourite-action-constants';

const initialState = {
  favourites: []
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case REMOVE_FROM_FAVOURITES:
      return {
        ...state,
        favourites: state.favourites.filter(
          favourite => favourite.summonerId !== action.summonerId
        )
      };
    default:
      return state;
  }
};

export default favouriteReducer;
