import { IWeather } from '../../types/weather.types';
import { checkIsFavourite } from '../../utils/checkIsFavourite';
import { IFavouritesState } from './../types/types';

export const getFavouritesSelector = (state: { favourites: IFavouritesState }) => state.favourites.favourites;

export const checkIsFavouriteSelector = (weather: IWeather) => (state: { favourites: IFavouritesState }) =>
  checkIsFavourite(weather, state.favourites);
