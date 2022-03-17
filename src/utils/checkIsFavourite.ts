import { IFavouritesState, isFavouriteItem } from '../store/types/types';
import { IWeather } from '../types/weather.types';
import { compareCoordinates } from './compareCoordinates';

export const checkIsFavourite = (param: IWeather, favourites: IFavouritesState) =>
  favourites.favourites.some((item: isFavouriteItem) => compareCoordinates(item, param));
