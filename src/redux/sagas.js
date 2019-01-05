import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import appSagas from './app/saga';
import ecommerceSagas from "./ecommerce/saga";
import masterDetailsSagas from './masterdetails/saga';
import reportSaga from './reports/saga';

export default function* rootSaga(getState) {
	yield all([
		authSagas(),	
		ecommerceSagas(),
		appSagas(),
		masterDetailsSagas(),
		reportSaga(),
	]);
}
