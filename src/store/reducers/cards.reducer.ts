import { IWeather } from '../../types/weather.types';
import { REMOVE_CARD, CARD_ERROR, ADD_NEW_CARD_SUCCESS, ADD_NEW_CARD_PENDING, DRAG_CARD } from '../types/cards.types';

interface ICardState {
  cards: Array<IWeather>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ICardState = {
  cards: [],
  isLoading: false,
  error: null,
};

const cardsReducer = (state: ICardState = initialState, action: { type: any; payload: any }): ICardState => {
  switch (action.type) {
    case ADD_NEW_CARD_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_NEW_CARD_SUCCESS:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
        isLoading: false,
      };
    case REMOVE_CARD:
      return {
        ...state,
        cards: [...state.cards.filter((item) => item.id !== action.payload)],
        isLoading: false,
      };
    case CARD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DRAG_CARD: {
      const [reorderedItem] = state.cards.splice(action.payload.index, 1);
      const newItem = state.cards.slice();
      newItem.splice(action.payload.destinationIndex, 0, reorderedItem);
      return {
        ...state,
        cards: newItem,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default cardsReducer;
