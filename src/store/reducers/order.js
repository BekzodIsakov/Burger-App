import * as actionTypes from '../actions/types';
import { updateState } from '../utility';

const initialState = {
  orders: [],
  isLoading: false,
  isPurchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateState(state, { isPurchased: false });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      return updateState(state, {
        orders: state.orders.concat(newOrder),
        isLoading: false,
        isPurchased: true,
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateState(state, { isLoading: false });
    case actionTypes.FETCH_ORDERS_START:
      return updateState(state, { isLoading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateState(state, {
        orders: action.fetchedOrders,
        isLoading: false,
      });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateState(state, { isLoading: false });
    default:
      return state;
  }
};

export default orderReducer;
