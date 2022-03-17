import { IResponseCurrentWeather, IResponseWeather } from '../types/weather.types';

const getAPIDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date;
};

export const formatDate = (timestamp: number) =>
  getAPIDate(timestamp).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

export const formatTime = (timestamp: number) =>
  getAPIDate(timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatCurrentTime = (timezone: string) => {
  const currentTime = new Date().toLocaleString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit' });
  return currentTime;
};

export const formatCurrentWeather = (weather: IResponseCurrentWeather) => ({
  city: weather.name,
  country: weather.sys.country,
  time: formatTime(weather.dt),
  date: formatDate(weather.dt),
  icon: weather.weather[0].icon,
  temperature: Math.round(weather.main.temp),
  wind: weather.wind.speed,
  humidity: weather.main.humidity,
  pressure: weather.main.pressure,
});

export const formatWeather = (weather: IResponseWeather, city: any, country: any) => ({
  city,
  country,
  lat: weather.lat,
  lon: weather.lon,
  currentTime: formatCurrentTime(weather.timezone),
  currentTemp: weather.current.temp,
  daily: weather.daily
    .map((item) => ({
      id: item.dt,
      time: formatTime(item.dt),
      date: formatDate(item.dt),
      icon: item.weather[0].icon,
      dayTemperature: Math.round(item.temp.day),
      nightTemperature: Math.round(item.temp.night),
    }))
    .slice(0, 7),
});
