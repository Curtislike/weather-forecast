export function saveToLocalStorage(key: string, state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(key, serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFromLocalStorage() {
  try {
    const serialisedFavourites = localStorage.getItem('weather_forecast__favourites');
    const serialisedTemperatureMeasurement = localStorage.getItem('weather_forecast__temperatureMeasurement');
    if (serialisedFavourites === null || serialisedTemperatureMeasurement === null) return undefined;
    return JSON.parse(serialisedFavourites);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
