import * as actionTypes from '../actions/types';
import { updateState } from '../utility';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  isLoading: false,
};

const authStart = (state, action) => {
  return updateState(state, { error: null, isLoading: true });
};

const authSuccess = (state, action) => {
  return updateState(state, {
    error: null,
    isLoading: false,
    idToken: action.idToken,
    userId: action.userId,
  });
};

const authLogOut = (state, action) => {
  return updateState(state, {
    idToken: null,
    userId: null,
  });
};

const authFail = (state, action) => {
  return updateState(state, { error: action.error, isLoading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogOut(state, action);
    default:
      return state;
  }
};

export default reducer;
