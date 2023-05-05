import {createSelector} from '@reduxjs/toolkit';

export const weatherDataLol = (state: GlobalState) => state.weatherData;
export const getIsFetching = (state: GlobalState) => state.isFetching;

export const weatherNameData = createSelector(weatherDataLol, x => x?.name);
export const weatherDataArray = createSelector(weatherDataLol, x => x?.weather);
export const weatherTemperature = createSelector(weatherDataLol, x => x?.main);
// export const weatherNameOnly = createSelector(weatherNameData, x => x?.name);
// const todos = state => state.weatherData;
// export const todosV2 = createSelector(todos, x => x?.data);

// export const testIsFetching = createSelector(haha, x => x);
// export const getIsFetching = createSelector(weatherDataLol, x => x?.fetching);
// export const weatherDataTest = createSelector(weatherDataLol, x => {
//   console.log('apa ni dalam reducer', weatherDataLol);
//   x?.data;
// });

// export const weatherDataName = createSelector(weatherDataTest, x => x?.name);

// export const getName = createSelector(weatherDataLol, x => {
//   if (!x?.data) {
//     return null;
//   }
//   return x?.data.name;
// });
