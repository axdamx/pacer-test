import {createReducer} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {mainDashboardActions} from './actions';

const initialState = {
  fetching: false,
  data: null,
  err: null,
  dailySteps: [
    {
      endDate: '',
      startDate: '',
      value: 0,
    },
  ],
  distanceRunningWalking: [
    {
      endDate: '',
      startDate: '',
      value: 0,
    },
  ],
};

const weatherData = createReducer(initialState.data, builder => {
  builder.addCase(
    mainDashboardActions.weatherApiCallSuccess,
    (_, action) => action.payload,
  );
});

const isFetching = createReducer(initialState.fetching, builder => {
  builder.addCase(mainDashboardActions.weatherApiCall, () => true);
  builder.addCase(mainDashboardActions.weatherApiCallSuccess, () => false);
});

const dailySteps = createReducer(initialState.dailySteps, builder => {
  builder.addCase(
    mainDashboardActions.getStepsDataSuccess,
    (_, action) => action.payload,
  );
});

const distanceRunningWalking = createReducer(
  initialState.distanceRunningWalking,
  builder => {
    builder.addCase(
      mainDashboardActions.getDistanceRunningWalkingSuccess,
      (_, action) => action.payload,
    );
  },
);

const rootReducer = combineReducers({
  weatherData,
  isFetching,
  dailySteps,
  distanceRunningWalking,
});
export default rootReducer;
