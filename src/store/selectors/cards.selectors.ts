export const getCardsLoadingSelector = (state: { cards: { isLoading: boolean } }) => state.cards.isLoading;

export const getCardsSelector = (state: { cards: { cards: any } }) => state.cards.cards;

export const getCardsErrorSelector = (state: { cards: { error: any } }) => state.cards.error;
