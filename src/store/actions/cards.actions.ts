import { getWeatherByCity, getWeatherByCoordinates, getWeatherByZip } from '../../services/getWeatherApi';
import { IWeather } from '../../types/weather.types';
import { createCardId } from '../../utils/createCardId';
import { showNotification } from '../../utils/showNotification';
import { ADD_NEW_CARD_PENDING, REMOVE_CARD, CARD_ERROR, ADD_NEW_CARD_SUCCESS, DRAG_CARD } from '../types/cards.types';
import { invalidCityValue, invalidCoordinatesValues, invalidZipValue } from '../../constants/notificationMessages';

export function addNewCardPending() {
  return {
    type: ADD_NEW_CARD_PENDING,
  };
}

export function addNewCardSuccess(weather: IWeather) {
  return {
    type: ADD_NEW_CARD_SUCCESS,
    payload: {
      ...weather,
      id: createCardId(),
    },
  };
}

export function removeCard(id?: number) {
  return {
    type: REMOVE_CARD,
    payload: id,
  };
}

export function cardError(error: any) {
  return {
    type: CARD_ERROR,
    payload: error,
  };
}

export function dragCard(index: number, destinationIndex: number) {
  return {
    type: DRAG_CARD,
    payload: {
      index,
      destinationIndex,
    },
  };
}

export const fetchCardByCoordinates = (latitude: number, longitude: number, successCallback?: () => void) => async (dispatch: any) => {
  dispatch(addNewCardPending());
  try {
    const weather = await getWeatherByCoordinates(latitude, longitude);
    dispatch(addNewCardSuccess(weather));
    if (successCallback) {
      successCallback();
    }
  } catch (error) {
    dispatch(cardError(error));
    showNotification(invalidCoordinatesValues);
  }
};

export const fetchCardByCity = (city: string, successCallback?: () => void) => async (dispatch: any) => {
  dispatch(addNewCardPending());
  try {
    const weather = await getWeatherByCity(city);
    dispatch(addNewCardSuccess(weather));
    if (successCallback) {
      successCallback();
    }
  } catch (error) {
    dispatch(cardError(error));
    showNotification(invalidCityValue);
  }
};

export const fetchCardByZip = (zip: string, country: string, successCallback?: () => void) => async (dispatch: any) => {
  dispatch(addNewCardPending());
  try {
    const weather = await getWeatherByZip(zip, country);
    dispatch(addNewCardSuccess(weather));
    if (successCallback) {
      successCallback();
    }
  } catch (error) {
    dispatch(cardError(error));
    showNotification(invalidZipValue);
  }
};
