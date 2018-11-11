import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import fake from './fake';
import fakeinitdata from '../../containers/POS/Cart/config';

export function* changedCard() {
  yield takeEvery(actions.CHANGE_CARDS, function* () { });
}
export function* initData() {
  let fakeData = fakeinitdata;
  if (fakeinitdata.productQuantity.length === 0) {
    fakeData = fake;
  }
  yield put({
    type: actions.INIT_DATA,
    payload: fakeData
  });
}
export function* updateData({ products, productQuantity }) {
  localStorage.setItem('cartProductQuantity', JSON.stringify(productQuantity));
  localStorage.setItem('cartProducts', JSON.stringify(products));
  yield put({
    type: actions.UPDATE_DATA,
    products,
    productQuantity
  });
}

export function* checkout({ payload }) {
  let fetchData = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    let res = yield call(fetch, '/api/saveReceipt', fetchData);
    let json = yield res.json();
    console.log(json);
    if (json.success) {
      yield put({ type: actions.CHECKOUT_SUCCESS, message: json.message });
    }
    else {
      yield put({ type: actions.CHECKOUT_FAIL, message: json.message });
    }
    return;
  }
  catch (e) {
    console.log("Login error", e);
    yield put({ type: actions.CHECKOUT_FAIL, message: "Failed to save data because of " + e });
    return;
  }

}

export default function* () {
  yield all([
    takeEvery(actions.INIT_DATA_SAGA, initData),
    takeEvery(actions.UPDATE_DATA_SAGA, updateData),
    takeEvery(actions.CHECKOUT_SAGA, checkout)
  ]);
}
