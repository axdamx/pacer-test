import {createAction} from '@reduxjs/toolkit';

export const mainDashboardActions = {
  weatherApiCall: createAction('WEATHER_API_CALL'),
  weatherApiCallSuccess: createAction('WEATHER_API_CALL_SUCCESS'),
  weatherApiCallFailed: createAction('WEATHER_API_CALL_FAILED'),
};
