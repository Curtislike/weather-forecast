import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  saveToLocalStorage('weather_forecast__temperatureMeasurement', {
    temperatureMeasurement: store.getState().temperatureMeasurement,
  });
});

store.subscribe(() => {
  saveToLocalStorage('weather_forecast__favourites', {
    favourites: store.getState().favourites,
  });
});

export default store;
