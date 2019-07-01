import { combineReducers } from 'redux';
import searchReducer from '../modules/search/reducers/search-reducer';
import rankedReducer from '../modules/ranked/reducers/ranked-reducer';
import favouriteReducer from '../modules/profile-header/reducers/favourite-reducer';
import championReducer from '../modules/champions/reducers/champion-reducer';

export default combineReducers({
  searchReducer,
  rankedReducer,
  favouriteReducer,
  championReducer,
});
