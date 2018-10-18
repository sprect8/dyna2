import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';

import ecommerceSagas from "./ecommerce/saga";

export default function* rootSaga(getState) {
	yield all([
		authSagas(),	
		ecommerceSagas(),
	]);
}
