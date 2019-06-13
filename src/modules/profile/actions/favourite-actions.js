import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from './favourite-action-constants';
import { storePersistantData } from '../../../utils/storage-utils';

export const addToFavourites = data => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_FAVOURITES,
    payload: data,
  });
  const { favourites } = getState().favouriteReducer;
  storePersistantData('@favourites', favourites);
};

export const removeFromFavourites = summonerId => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_FAVOURITES,
    summonerId,
  });
  const { favourites } = getState().favouriteReducer;
  storePersistantData('@favourites', favourites);
};
