import { all, takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken, getToken } from '../../helpers/utility';
import actions from './actions';

const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest(payload) {
  let {username, password} = payload.payload;
  let fetchData = {
    method: 'POST',
    body: JSON.stringify({ "name": username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    let res = yield call(fetch, '/login', fetchData);
    let json = yield res.json();

    console.log("Login result", json);

    if (json.success) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: {token: json.token},
        profile: "Profile",
        name: json.name,
      })
    }
    else {
      yield put({ type: actions.LOGIN_ERROR, message: "Failed to login because of " + json.message });  
    }
    return;
  }
  catch (e) {
    console.log("Login error", e);
    yield put({ type: actions.LOGIN_ERROR, message: "Failed to login because of " + e });
    return;
  }
}

export function* loginSuccess({ payload }) {
  yield localStorage.setItem('id_token', payload.token);
}

export function* logoutRequest() {
  clearToken();
  yield put({type: actions.LOGOUT});
  yield put(push('/'));
}
export function* checkAuthorization() {
  console.log("We are about to checkAuth");
  let response = yield call(fetch, '/api/ping');
  
  const token = getToken();
  if (response.status === 403) {
    clearToken();
    yield put({
      type: actions.LOGIN_FAILED
    });
  }
  let json = yield response.json();
  if (json.success) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: { token },
      name: json.name,
      profile: 'Profile',
    });
  }
  else {
    clearToken();
    yield put({
      type: actions.LOGIN_FAILED
    });
  }
}
export function* resetPassword({payload}) {
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    let response = yield call(fetch, '/resetpass', fetchData);
    let json = yield response.json();
    if (json.success) {
      yield put({ type: actions.RESETPASS, result: json });
    }
    else {
      yield put({ type: actions.REGISTER_ERROR, error: json.message }); // server side error caught and handled
    }
  }
  catch (e) {
    yield put(actions.registerError(e)); // unhandled server side error
    return;
  }
}

export function* registerUser(payload) {
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log("Running fetch on register with", fetchData);
    let response = yield call(fetch, '/register', fetchData);
    let json = yield response.json();
    if (json.success) {
      yield put({ type: actions.REGISTER_REQUEST, result: json });
    }
    else {
      yield put({ type: actions.REGISTER_ERROR, error: json.message }); // server side error caught and handled
    }
  }
  catch (e) {
    yield put(actions.registerError(e)); // unhandled server side error
    return;
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    yield takeEvery(actions.LOGIN_REQUEST, loginRequest),
    yield takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    yield takeEvery(actions.LOGOUT_SAGA, logoutRequest),
    yield takeEvery(actions.REGiSTER_REQUEST_SAGA, registerUser),    
    yield takeEvery(actions.RESETPASS_SAGA, resetPassword),
  ]);
}
