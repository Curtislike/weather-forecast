import { IWeather } from '../../types/weather.types';
import { compareCoordinates } from '../../utils/compareCoordinates';
import { IFavouritesState } from '../types/types';
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from './../types/favourites.types';

const initialState: IFavouritesState = {
  favourites: [],
};

const favouritesReducer = (state: IFavouritesState = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      return {
        favourites: state.favourites.concat([action.payload]),
      };
    case REMOVE_FROM_FAVOURITES:
      return {
        favourites: [...state.favourites.filter((item) => !compareCoordinates(item, action.payload))],
      };
    default:
      return state;
  }
};

export default favouritesReducer;
