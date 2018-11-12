import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import { push } from 'react-router-redux';
import { clearToken, getToken } from '../../helpers/utility';


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

export function* logoutRequest() {
    clearToken();
    yield put({ type: actions.LOGOUT });
    yield put(push('/'));
}

function* loadConfigJson(action, path) {
    var options = {
        path: path,
        method: 'GET',
        json: true
    }
    try {
        let res = yield call(fetch, path, options)
        console.log(res);
        if (res && res.json) {
            let json = yield res.json();

            console.log("Json Loaded Mate", json);

            if (res.status == 403) {
                logoutRequest();
                return;
            }

            yield put({
                type: action, //actions.LOAD_CONFIG_SIDEBAR,
                config: json
            }); 
        }
        else {
            // maybe a login problem?
            logoutRequest();
        }
    }
    catch (e) {
        console.log("Failed", e);
        logoutRequest();
    }
}

export function* loadSidebarConfig() {
    yield loadConfigJson(actions.LOAD_CONFIG_SIDEBAR, '/api/sidebarConfig');
}

export function* loadReportConfig() {
    yield loadConfigJson(actions.LOAD_CONFIG_REPORTS, '/api/reportProfiles');
}

export function* loadInputConfig() {
    yield loadConfigJson(actions.LOAD_CONFIG_INPUT, '/api/tableProfiles');
}
export default function* () {
    yield all([
        takeEvery(actions.LOAD_CONFIG_SIDEBAR_SAGA, loadSidebarConfig),
        takeEvery(actions.LOAD_CONFIG_REPORTS_SAGA, loadReportConfig),
        takeEvery(actions.LOAD_CONFIG_INPUT_SAGA, loadInputConfig),
    ]);
}
