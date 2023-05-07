import {createAction} from '@reduxjs/toolkit';

export const mainDashboardActions = {
  weatherApiCall: createAction('WEATHER_API_CALL'),
  weatherApiCallSuccess: createAction('WEATHER_API_CALL_SUCCESS'),
  weatherApiCallFailed: createAction('WEATHER_API_CALL_FAILED'),

  getStepsDataSuccess: createAction<dailySteps.GetSteps[]>(
    'GET_STEPS_DATA_SUCCESS',
  ),

  getDistanceRunningWalkingSuccess: createAction<
    distanceRunningWalking.GetDistanceRunningWalking[]
  >('GET_DISTANCE_RUNNING_WALKING_SUCCESS'),

  submitStepsAndWalkingGoalsSuccess: createAction<StepsAndWalkingGoals.State>(
    'SUBMIT_STEPS_AND_WALKING_GOALS_SUCCESS',
  ),
};
