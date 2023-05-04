import {createReducer} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {mainDashboardActions} from './actions';

const initialState = {fetching: false, data: null, err: null};

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

const rootReducer = combineReducers({weatherData, isFetching});
export default rootReducer;
