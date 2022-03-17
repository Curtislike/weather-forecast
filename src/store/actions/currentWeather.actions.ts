import { RECIEVE_CURRENT_WEATHER_ERROR, RECIEVE_CURRENT_WEATHER_PENDING, RECIEVE_CURRENT_WEATHER_SUCCESS } from '../types/currentWeather.types';
import { getCurrentWeather } from '../../services/getWeatherApi';
import { ICurrentWeather } from '../../types/weather.types';

export function recieveCurrentWeatherPending() {
  return {
    type: RECIEVE_CURRENT_WEATHER_PENDING,
  };
}

export function recieveCurrentWeatherSuccess(currentWeather: ICurrentWeather) {
  return {
    type: RECIEVE_CURRENT_WEATHER_SUCCESS,
    payload: currentWeather,
  };
}

export function recieveCurrentWeatherError(error: any) {
  return {
    type: RECIEVE_CURRENT_WEATHER_ERROR,
    payload: error,
  };
}

export const fetchCurrentWeather = (latitude: number, longitude: number) => async (dispatch: any) => {
  dispatch(recieveCurrentWeatherPending());
  try {
    const currentWeather = await getCurrentWeather(latitude, longitude);
    dispatch(recieveCurrentWeatherSuccess(currentWeather));
  } catch (error) {
    dispatch(recieveCurrentWeatherError(error));
  }
};
