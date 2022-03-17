import { DEGREE_CELSIUS, DEGREE_FAHRENHEIT } from '../constants/mesurement';
import { TemperatureMeasurement } from '../store/reducers/temperatureMeasurement.reducer';

const KELVIN_CONVERTER = 273.15;

export const convertKelvinToCelcius = (temperature: number) => Math.round(temperature - KELVIN_CONVERTER);

export const convertKelvinToFahrenheit = (temperature: number) => Math.round(temperature * (9 / 5) - 459.67);

export const formatTemperature = (temperature: number, temperatureMeasurement: number) => {
  switch (temperatureMeasurement) {
    case TemperatureMeasurement.Celsius:
      return convertKelvinToCelcius(temperature) + DEGREE_CELSIUS;
    case TemperatureMeasurement.Fahrenheit:
      return convertKelvinToFahrenheit(temperature) + DEGREE_FAHRENHEIT;
  }
};

export const formatTemperatureNumber = (temperature: number, temperatureMeasurement: number) => {
  switch (temperatureMeasurement) {
    case TemperatureMeasurement.Celsius:
      return convertKelvinToCelcius(temperature);
    case TemperatureMeasurement.Fahrenheit:
      return convertKelvinToFahrenheit(temperature);
  }
};
