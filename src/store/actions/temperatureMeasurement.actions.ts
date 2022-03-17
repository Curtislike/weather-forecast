import { TemperatureMeasurement } from '../reducers/temperatureMeasurement.reducer';
import { SET_TEMPERATURE_MEASUREMENT } from '../types/temperatureMeasurement.types';

export function setTemperatureMeasurement(temperatureMeasurement: TemperatureMeasurement) {
  return {
    type: SET_TEMPERATURE_MEASUREMENT,
    payload: temperatureMeasurement,
  };
}
