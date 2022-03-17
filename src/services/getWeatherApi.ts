import * as qs from 'qs';

import { API_KEY, BASE_URL_DAILY, BASE_URL_CURRENT, BASE_URL_ONE_CALL } from '../constants/weatherApi';
import { ICurrentWeather, IWeather } from '../types/weather.types';
import { formatCurrentWeather, formatWeather } from '../utils/formatWeather';
import { IResponseWeather } from './../types/weather.types';

export const getCurrentWeather = async (lat: number, lon: number): Promise<ICurrentWeather> => {
  const coordinates = {
    lat,
    lon,
    appid: API_KEY,
  };
  const params = qs.stringify(coordinates);
  const apiData = await fetch(BASE_URL_CURRENT + params);
  const data = await apiData.json();

  return formatCurrentWeather(data);
};

const getBaseWeather = async (params: string) => {
  const apiData = await fetch(BASE_URL_DAILY + params + '&appid=' + API_KEY);
  const data = await apiData.json();

  return data;
};

const getWeatherData = async (urlParams: string): Promise<IResponseWeather> => {
  const apiData = await fetch(BASE_URL_ONE_CALL + urlParams);
  const data = await apiData.json();

  return data;
};

const getWeather = async (params: string): Promise<IWeather> => {
  const baseWeather = await getBaseWeather(params);
  const urlParams = qs.stringify({
    lat: baseWeather.city.coord.lat,
    lon: baseWeather.city.coord.lon,
    exclude: 'hourly,minutely,alerts',
    appid: API_KEY,
  });
  const city = baseWeather.city.name;
  const country = baseWeather.city.country;
  const weather = await getWeatherData(urlParams);

  return formatWeather(weather, city, country);
};

export const getWeatherByCity = async (q: string): Promise<IWeather> => {
  const params = {
    q,
  };

  return await getWeather(qs.stringify(params));
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<IWeather> => {
  const params = {
    lat,
    lon,
  };

  return await getWeather(qs.stringify(params));
};

export const getWeatherByZip = async (zip: string, country: string): Promise<IWeather> => {
  const params = {
    zip: zip + ',' + country,
  };
  return await getWeather(qs.stringify(params));
};
