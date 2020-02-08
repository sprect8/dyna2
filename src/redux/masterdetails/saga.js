import { all, takeEvery, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import actions from './actions';
import { get } from '../api';

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

export function* saveCompanyData({payload}) {
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        let res = yield call(fetch, '/api/company-settings', fetchData);
        let json = yield res.json();
        
        if (json.success === false) {
            yield put({ type: actions.DATA_ERROR, message: json.message});            
        }
        else {
            yield put({ type: actions.SAVE_COMPANY_SETTINGS, payload: json });
        }
        return;
    }
    catch (e) {
        console.log("Login error", e);
        yield put({ type: actions.DATA_ERROR, message: "Failed to save data because of " + e });
        return;
    }
}

export function* saveUserData({payload}) {
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        let res = yield call(fetch, '/api/user-settings', fetchData);
        let json = yield res.json();
        console.log(json);
        if (json.success === false) {
            yield put({ type: actions.DATA_ERROR, message: json.message});            
        }
        else {
            yield put({ type: actions.SAVE_USER_SETTINGS, payload:json });
        }
        return;
    }
    catch (e) {
        console.log("Login error", e);
        yield put({ type: actions.DATA_ERROR, message: "Failed to save data because of " + e });
        return;
    }
}

export function* loadData({ config, pageStart, total }) {
    let fetchData = {
        method: 'GET',
        //body: JSON.stringify({ pageStart, total }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        //yield delay(10000);
        let res = yield call(fetch, '/api/' + config.tableName.toLowerCase() + "?pageStart=" + pageStart + "&total=" + total, fetchData);
        let json = yield res.json();
        console.log(json);
        yield put({ type: actions.LOAD_DATA, payload: json });
        return;
    }
    catch (e) {
        console.log("Login error", e);
        yield put({ type: actions.DATA_ERROR, message: "Failed to load data because of " + e });
        return;
    }
}
export function* loadUserSettings() {
    try {
        let res = yield call(fetch, '/api/user-settings');
        let json = yield res.json();
        console.log(json);
        // fail condition validation here
        yield put({type:actions.LOAD_USER_SETTINGS, payload: json})
    }
    catch (e) {        
        console.log("Login error", e);
        yield put({ type: actions.DATA_ERROR, message: "Failed to save data because of " + e });
        return;
    }
}
export function* saveData({ config, row }) {
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(row),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        let res = yield call(fetch, '/api/' + config.tableName.toLowerCase(), fetchData);
        let json = yield res.json();
        console.log(json);
        yield put({ type: actions.ACTION_SUCCESS, name: "SAVE" });
        yield put(actions.loadData(config, 0, 10));
        return;
    }
    catch (e) {
        console.log("Login error", e);
        yield put({ type: actions.DATA_ERROR, message: "Failed to save data because of " + e });
        return;
    }
}
export function* updateData({ config, row }) {
    yield put({
        type: actions.UPDATE_DATA,

    });
}
export function* deleteData({ config, uniqueId }) {
    let fetchData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        let res = yield call(fetch, '/api/' + config.tableName.toLowerCase() + "/" + uniqueId, fetchData);
        let json = yield res.json();
        console.log(json);
        if (res.status === 403) {
            yield put({ type: actions.DELETE_FAILED, message: "Failed to delete, permission denied"});
            return;
        }
        if (!json.success) {
            yield put({ type: actions.DELETE_FAILED, message: "Failed to delete, " + json.error});
            return;
        }
        yield put({ type: actions.DELETE_SUCCESS });
        yield put(actions.loadData(config, 0, 10));
        return;
    }
    catch (e) {
        console.log("Login error", e);
        yield put({ type: actions.DELETE_FAILED, message: "Failed to delete data because of " + e });
        return;
    }
}

export default function* () {
    yield all([
        takeEvery(actions.LOAD_DATA_SAGA, loadData),
        takeEvery(actions.UPDATE_DATA, updateData),
        takeEvery(actions.SAVE_DATA, saveData),
        takeEvery(actions.DELETE_DATA, deleteData),
        takeEvery(actions.LOAD_USER_SETTINGS_SAGA, loadUserSettings),
        takeEvery(actions.SAVE_COMPANY_SETTINGS_SAGA, saveCompanyData),
        takeEvery(actions.SAVE_USER_SETTINGS_SAGA, saveUserData),
    ]);
}
