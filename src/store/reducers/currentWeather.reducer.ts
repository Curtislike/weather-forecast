import { RECIEVE_CURRENT_WEATHER_ERROR, RECIEVE_CURRENT_WEATHER_PENDING, RECIEVE_CURRENT_WEATHER_SUCCESS } from '../types/currentWeather.types';
import { ICurrentWeatherState } from '../types/types';

const initialState: ICurrentWeatherState = {
  currentWeather: null,
  isLoading: true,
  error: null,
};

const currentWeatherReducer = (state: ICurrentWeatherState = initialState, action: { type: any; payload: any }): ICurrentWeatherState => {
  switch (action.type) {
    case RECIEVE_CURRENT_WEATHER_PENDING:
      return {
        currentWeather: null,
        isLoading: true,
        error: null,
      };
    case RECIEVE_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentWeather: action.payload,
      };
    case RECIEVE_CURRENT_WEATHER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currentWeatherReducer;
