import {createSelector} from '@reduxjs/toolkit';

export const weatherDataLol = (state: GlobalState) => state.weatherData;
export const getIsFetching = (state: GlobalState) => state.isFetching;
const dailySteps = (state: GlobalState) => state.dailySteps;
const distanceRunningWalking = (state: GlobalState) =>
  state.distanceRunningWalking;

export const weatherNameData = createSelector(weatherDataLol, x => x?.name);
export const weatherDataArray = createSelector(weatherDataLol, x => x?.weather);
export const weatherTemperature = createSelector(weatherDataLol, x => x?.main);

export const formattedDailyStepsArray = createSelector(dailySteps, x => {
  const groupedData = x.reduce((acc, curr) => {
    const date = curr.startDate.slice(0, 10); // Extract date from start date
    if (!acc[date]) {
      acc[date] = {date: date, value: 0};
    }
    acc[date].value += curr.value;
    return acc;
  }, {});

  // Convert object to array
  const result: dailySteps.GetStepsFormatted[] = Object.values(groupedData);
  return result;
});

export const formattedDistanceRunningWalkingArray = createSelector(
  distanceRunningWalking,
  x => {
    const groupedData = x.reduce((acc, curr) => {
      const date = curr.startDate.slice(0, 10); // Extract date from start date
      if (!acc[date]) {
        acc[date] = {date: date, value: 0};
      }
      acc[date].value += curr.value;
      return acc;
    }, {});

    // Convert object to array
    const result: distanceRunningWalking.GetDistanceRunningWalkingFormatted[] =
      Object.values(groupedData);
    return result;
  },
);
