import { ICurrentWeather } from '../../types/weather.types';

export const getCurrentWeatherLoadingSelector = (state: { currentWeather: { isLoading: boolean } }) => state.currentWeather.isLoading;

export const getCurrentWeatherSelector = (state: { currentWeather: { currentWeather: ICurrentWeather } }) => state.currentWeather.currentWeather;

export const getCurrentWeatherErrorSelector = (state: { currentWeather: { error: any } }) => state.currentWeather.error;
