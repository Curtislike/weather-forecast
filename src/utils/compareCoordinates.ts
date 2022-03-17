import { isFavouriteItem } from '../store/types/types';
import { IWeather } from '../types/weather.types';

export const compareCoordinates = (item: IWeather | isFavouriteItem, param: IWeather | isFavouriteItem): boolean =>
  item.lat === param.lat && item.lon === param.lon;
