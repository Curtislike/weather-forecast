import { combineReducers } from 'redux';
import cardsReducer from './cards.reducer';
import currentWeatherReducer from './currentWeather.reducer';
import favouritesReducer from './favourites.reducer';
import temperatureMeasurementReducer from './temperatureMeasurement.reducer';

const rootReducer = combineReducers({
  currentWeather: currentWeatherReducer,
  cards: cardsReducer,
  temperatureMeasurement: temperatureMeasurementReducer,
  favourites: favouritesReducer,
});

export default rootReducer;
