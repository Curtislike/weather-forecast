import { IWeather } from '../../types/weather.types';
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from './../types/favourites.types';

export function addToFavourites(weather: IWeather) {
  return {
    type: ADD_TO_FAVOURITES,
    payload: {
      id: weather.id,
      lat: weather.lat,
      lon: weather.lon,
      cityName: weather.city,
    },
  };
}

export function removeFromFavourites(weather: IWeather) {
  return {
    type: REMOVE_FROM_FAVOURITES,
    payload: {
      lat: weather.lat,
      lon: weather.lon,
      cityName: weather.city,
    },
  };
}
