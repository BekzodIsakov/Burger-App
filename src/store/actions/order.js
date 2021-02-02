import * as actionTypes from './types';
import axios from '../../axios-instances';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
  };
};

export const purchaseBurgerStart = (orderData, token) => {
  return (dispatch) => {
    console.log(token);
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((res) => {
        const id = res.data.name;
        dispatch(purchaseBurgerSuccess(id, orderData));
      })
      .catch(() => dispatch(purchaseBurgerFail()));
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    console.log(token);
    axios
      .get('/orders.json?auth=' + token)
      .then((res) => {
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(() => dispatch(fetchOrdersFail()));
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    fetchedOrders,
  };
};

export const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
  };
};
