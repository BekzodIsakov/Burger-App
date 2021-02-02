import * as actionTypes from './types';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

const authLogOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authCheckTimeOut = (expiryTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogOut());
    }, expiryTime * 1000);
  };
};

export const authenticate = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQ9eV6D-o-aHKlXaLxF5RS-j7YNRc8jeY'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQ9eV6D-o-aHKlXaLxF5RS-j7YNRc8jeY';

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(authCheckTimeOut(res.data.expiresIn));
      })
      .catch((err) => {
        // console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error));
      });
  };
};
