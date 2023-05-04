// import {call, put, takeLatest} from 'redux-saga/effects';
// import {getProfile} from '../api';
// import {sendNetworkFail} from '../actions';
// import {mainDashboardActions} from './actions';
// import { getWeatherApi } from './api';

// export function* getWeatherApiRuntime() {
//   yield takeLatest(mainDashboardActions.weatherApiCall, handleGetWeatherApi);
// }

// function* handleGetWeatherApi(action) {
//   try {
//     const response = yield call(getWeatherApi, action.payload);
//     if (response) {
//       yield put(mainDashboardActions.weatherApiCallSuccess(response));
//     } else {
//       if (
//         response.problem !== 'NETWORK_ERROR' &&
//         response.problem !== 'TIMEOUT_ERROR' &&
//         response.problem !== 'CONNECTION_ERROR'
//       ) {
//         yield put(mainDashboardActions.weatherApiCallFailed(response.problem));
//       }
//     }
//   } catch (error) {
//     console.log('error', error);
//   }
// }
