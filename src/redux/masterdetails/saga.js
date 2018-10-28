import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import { fetch, get } from '../api';

// Load Data (paged)
// Save Data (new)
// Save Data (existing)
// Delete Data 
/*
    LOAD_DATA: "LOAD_DATA",
    SAVE_DATA: "SAVE_DATA",
    UPDATE_DATA: "UPDATE_DATA",
    DELETE_DATA: "DELETE_DATA",

*/

export function* loadData({ config, pageStart, total }) {
    yield put({
        type: actions.INIT_DATA,
        payload: fakeData
    });
}
export function* saveData({ config, row }) {
    yield put({
        type: actions.UPDATE_DATA,
        products,
        productQuantity
    });
}
export function* updateData({ config, row }) {
    yield put({
        type: actions.UPDATE_DATA,
        products,
        productQuantity
    });
}
export function* deleteData({ config, uniqueId }) {
    yield put({
        type: actions.UPDATE_DATA,
        products,
        productQuantity
    });
}

export default function* () {
    yield all([
        takeEvery(actions.INIT_DATA_SAGA, initData),
        takeEvery(actions.UPDATE_DATA_SAGA, updateData)
    ]);
}
