import { REMOVE_FROM_FAVORITES, RESET_SAVE, SAVE_TO_FAVORITES } from "../actions/userActions";

type IActionsType = typeof SAVE_TO_FAVORITES | typeof REMOVE_FROM_FAVORITES | typeof RESET_SAVE

interface IActions {
  type: IActionsType
  payload: any
}

interface IState {
  favorites: IFavorite[],
  saved: boolean
}

const initialState: IState = {
  favorites: [],
  saved: false
};


export default (state = initialState, action: IActions) => {
  switch (action.type) {
    case SAVE_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload.favorite],
        saved: action.payload.saved
      };

    case RESET_SAVE:
      return {
        ...state,
        saved: false
      };

    case REMOVE_FROM_FAVORITES:
      const favorites = state.favorites;
      const filteredFavorite = favorites.filter(favorite => favorite.cityName !== action.payload.cityName);


      return {
        ...state,
        favorites: filteredFavorite,
        saved: action.payload.saved
      };

    default:
      return state;
  }
}
