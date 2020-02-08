import { all, takeEvery, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import actions from './actions';
import { get } from '../api';

export function* loadData({ report }) {
    let fetchData = {
        method: 'GET',
        //body: JSON.stringify({ pageStart, total }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        //yield delay(10000);
        console.log(report);
        let res = yield call(fetch, '/api/report/' + report, fetchData);
        console.log(res);
        let json = yield res.json();
        console.log(json);
        yield put({ type: actions.LOAD_REPORT, result: json });
        return;
    }
    catch (e) {
        console.log("Login error", e);
        yield put({ type: actions.DATA_ERROR, message: "Failed to load data because of " + e });
        return;
    }
}

export default function* () {
    yield all([
        takeEvery(actions.LOAD_REPORT_SAGA, loadData),
    ]);
}
