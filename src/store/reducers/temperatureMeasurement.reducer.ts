import { SET_TEMPERATURE_MEASUREMENT } from '../types/temperatureMeasurement.types';

export enum TemperatureMeasurement {
  Celsius,
  Fahrenheit,
}

const initialState = {
  temperatureMeasurement: TemperatureMeasurement.Celsius,
};

const temperatureMeasurementReducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case SET_TEMPERATURE_MEASUREMENT:
      return {
        temperatureMeasurement: action.payload,
      };
    default:
      return state;
  }
};

export default temperatureMeasurementReducer;
