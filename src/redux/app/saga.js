import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import {reportConfiguration, tableConfiguration, sidebarOptions} from './fake';

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

export function* loadSidebarConfig() {
    yield put({
        type: actions.LOAD_CONFIG_SIDEBAR,
        sidebarConfig: sidebarOptions
    });
}

export function* loadReportConfig() {
    yield put({
        type: actions.LOAD_CONFIG_REPORTS,
        config: reportConfiguration
    });
}

export function* loadInputConfig() {
    yield put({
        type: actions.LOAD_CONFIG_INPUT,
        config: tableConfiguration
    });
}
export default function* () {
    yield all([
        takeEvery(actions.LOAD_CONFIG_SIDEBAR_SAGA, loadSidebarConfig),        
        takeEvery(actions.LOAD_CONFIG_REPORTS_SAGA, loadReportConfig),
        takeEvery(actions.LOAD_CONFIG_INPUT_SAGA, loadInputConfig),
    ]);
}
