import { combineReducers } from 'redux';
import searchReducer from '../modules/search/reducers/search-reducer';
import rankedReducer from '../modules/profile/reducers/ranked-reducer';
import favouriteReducer from '../modules/profile/reducers/favourite-reducer';
import championReducer from '../modules/profile/reducers/champion-reducer';

export default combineReducers({
  searchReducer,
  rankedReducer,
  favouriteReducer,
  championReducer,
});
