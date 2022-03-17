import { ICurrentWeather, IWeather } from '../../types/weather.types';

export interface isFavouriteItem {
  id?: number;
  lat: number;
  lon: number;
  cityName: string;
}

export interface IFavouritesState {
  favourites: Array<isFavouriteItem>;
}

export interface ICurrentWeatherState {
  currentWeather: ICurrentWeather | null;
  isLoading: boolean;
  error: string | null;
}
