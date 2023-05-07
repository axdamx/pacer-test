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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Icon
              name={weatherFormattedData.icon}
              size={100}
              color={weatherFormattedData.color}
            />
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: weatherFormattedData.color,
              }}>
              {temperature?.temp}°
            </Text>
          </View>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}> {name} </Text>
          <Text style={{fontSize: 20}}> {weatherFormattedData?.title}</Text>
          <Text style={{fontSize: 20}}> {weatherDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDailySteps = () => {
    if (formattedDailySteps) {
      return formattedDailySteps.map((x, index) => {
        const formattedSteps = Math.floor(x.value);
        return (
          <View
            key={index}
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              marginVertical: 5,
              borderRadius: 15,
            }}>
            <Text>{`Date: ${x.date}`}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {formattedSteps}
            </Text>
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
          <View
            key={index}
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              marginVertical: 5,
              borderRadius: 15,
            }}>
            <Text>{`Date: ${x.date}`}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>{`${formattedDistance} KM`}</Text>
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
        <View style={{marginTop: 5, marginBottom: 25}}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Your Daily steps
          </Text>
          {renderDailySteps()}
        </View>
        <View style={{marginTop: 5, marginBottom: 25}}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
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
});

export default DashboardScreen;
