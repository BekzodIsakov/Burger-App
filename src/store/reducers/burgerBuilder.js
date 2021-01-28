import * as actionTypes from '../actions/types';
import { updateState } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  return updateState(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredient]: state.ingredients[action.ingredient] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
  });
};

const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return updateState(state, {
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
          bacon: action.ingredients.bacon,
        },
        totalPrice: 4,
      });
    case actionTypes.SET_INGREDIENTS_FAILED:
      return updateState(state, { error: true });
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action); //similar function could be applied for other cases in the reducer. Left for the sake of readibility
    case actionTypes.REMOVE_INGREDIENT:
      return updateState(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      });
    default:
      return state;
  }
};

export default ingredients;
