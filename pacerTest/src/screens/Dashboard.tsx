import React, {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mainDashboardActions} from '../actions';
import {
  formattedDailyStepsArray,
  formattedDistanceRunningWalkingArray,
  getIsFetching,
  stepsAndWalkingGoals,
  weatherDataArray,
  weatherNameData,
  weatherTemperature,
} from '../selectors';
import {getWeatherApi} from '../api';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {weatherConditionsUtil} from '../contants/weatherConditions';
import {COLORS} from '../contants/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

const DashboardScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const name = useSelector(weatherNameData);
  const isFetching = useSelector(getIsFetching);
  const weatherArray = useSelector(weatherDataArray);
  const temperature = useSelector(weatherTemperature);
  const formattedDailySteps = useSelector(formattedDailyStepsArray);
  const formattedDistanceRunningWalking = useSelector(
    formattedDistanceRunningWalkingArray,
  );
  const stepsAndWalkingGoalsData = useSelector(stepsAndWalkingGoals);

  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      ],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  } as HealthKitPermissions;

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      const today = new Date();

      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }

      const seventDaysAgo = new Date(today);
      seventDaysAgo.setDate(today.getDate() - 7);

      const stepsParams = {
        startDate: seventDaysAgo.toISOString(),
      };

      AppleHealthKit.getDailyStepCountSamples(
        stepsParams,
        (err: Object, results: Array<dailySteps.GetSteps>) => {
          if (err) {
            return;
          }
          dispatch(mainDashboardActions.getStepsDataSuccess(results));
        },
      );

      const minusOneMonth = new Date(today);
      minusOneMonth.setDate(today.getMonth() - 1);

      const distanceParams = {
        startDate: minusOneMonth.toISOString(),
      };

      AppleHealthKit.getDailyDistanceWalkingRunningSamples(
        distanceParams,
        (
          err: Object,
          results: Array<distanceRunningWalking.GetDistanceRunningWalking>,
        ) => {
          if (err) {
            return;
          }
          dispatch(
            mainDashboardActions.getDistanceRunningWalkingSuccess(results),
          );
        },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAndStoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAndStoreData = async () => {
    dispatch(mainDashboardActions.weatherApiCall());
    Geolocation.getCurrentPosition(async info => {
      const payload = {
        lat: info.coords.latitude,
        long: info.coords.longitude,
      };
      const dataLol = await getWeatherApi(payload);
      dispatch(mainDashboardActions.weatherApiCallSuccess(dataLol));
    });
  };

  const renderMainWeatherDisplayData = () => {
    const weatherMain = weatherArray && weatherArray[0].main;
    const weatherDescription = weatherArray && weatherArray[0].description;

    const weatherFormattedData = weatherConditionsUtil(weatherMain);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('WeatherInfo')}>
        <View>
          <View style={styles.mainWeatherContainer}>
            <Icon
              name={weatherFormattedData.icon}
              size={100}
              color={weatherFormattedData.color}
            />
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: weatherFormattedData.color,
              }}>
              {temperature?.temp}°
            </Text>
          </View>
          <Text style={styles.boldName}> {name} </Text>
          <Text style={styles.fontSize20}> {weatherFormattedData?.title}</Text>
          <Text style={styles.fontSize20}> {weatherDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDailyStepsAndWalkingGoals = () => {
    const {dailySteps, walkingGoals} = stepsAndWalkingGoalsData;
    const goals = walkingGoals / 1000;
    const formattedGoals = goals.toFixed(2);

    return (
      <View style={styles.goalsContainer}>
        <Text style={styles.goalsText}>
          This your targeted step goals per day: {dailySteps}
        </Text>
        <Text style={styles.goalsText}>
          This your targeted walking goals per day: {formattedGoals}KM
        </Text>
      </View>
    );
  };

  const renderDailySteps = () => {
    if (formattedDailySteps) {
      return formattedDailySteps.map((x, index) => {
        const formattedSteps = Math.floor(x.value);
        return (
          <View key={index} style={styles.dailyStepsContainer}>
            <Text>{`Date: ${x.date}`}</Text>
            <Text style={styles.dailyStepsText}>{formattedSteps}</Text>
          </View>
        );
      });
    }
    return null;
  };

  const renderDistanceWalkingRunning = () => {
    if (formattedDistanceRunningWalking) {
      return formattedDistanceRunningWalking.map((x, index) => {
        const distance = x.value / 1000;
        const formattedDistance = distance.toFixed(2);
        return (
          <View key={index} style={styles.dailyStepsContainer}>
            <Text>{`Date: ${x.date}`}</Text>
            <Text
              style={styles.dailyStepsText}>{`${formattedDistance} KM`}</Text>
          </View>
        );
      });
    }
    return null;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isFetching ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <View>{renderMainWeatherDisplayData()}</View>
        )}
        {renderDailyStepsAndWalkingGoals()}
        <View style={styles.dailyStepsViewContainer}>
          <Text style={styles.dailyMainStepsTitle}>Your Daily steps</Text>
          {renderDailySteps()}
        </View>
        <View style={styles.dailyStepsViewContainer}>
          <Text style={styles.dailyMainStepsTitle}>
            Your Running Walking Distance
          </Text>
          {renderDistanceWalkingRunning()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  fontSize20: {
    fontSize: 20,
  },
  goalsContainer: {
    padding: 15,
    marginVertical: 15,
    alignItems: 'center',
  },
  goalsText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dailyStepsContainer: {
    backgroundColor: COLORS.primary,
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
  },
  dailyStepsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dailyStepsViewContainer: {
    marginTop: 5,
    marginBottom: 25,
  },
  dailyMainStepsTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DashboardScreen;
