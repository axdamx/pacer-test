declare interface GlobalState {
  weatherData: weatherData.State;
  isFetching: boolean;
  dailySteps: dailySteps.State[];
  distanceRunningWalking: distanceRunningWalking.State[];
  stepsAndWalkingGoals: StepsAndWalkingGoals.State;
}
