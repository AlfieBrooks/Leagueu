import { combineReducers } from 'redux';
import searchReducer from '../modules/search/reducers/search-reducer';
import rankedReducer from '../modules/profile/reducers/ranked-reducer';

export default combineReducers({
  searchReducer,
  rankedReducer,
});
