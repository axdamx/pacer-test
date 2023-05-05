import React, {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mainDashboardActions} from '../actions';
import {
  getIsFetching,
  weatherDataArray,
  weatherNameData,
  weatherTemperature,
} from '../selectors';
import {getWeatherApi} from '../api';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {weatherConditionsUtil} from '../contants/weatherConditions';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const name = useSelector(weatherNameData);
  const isFetching = useSelector(getIsFetching);
  const weatherArray = useSelector(weatherDataArray);
  const temperature = useSelector(weatherTemperature);

  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.HeartRate],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  } as HealthKitPermissions;

  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }

    const options = {
      startDate: new Date(2023, 4, 2).toISOString(),
    };

    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        /* Samples are now collected from HealthKit */
        console.log('getHeartRateSamples', results);
      },
    );
  });

  useEffect(() => {
    fetchAndStoreData();
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
      <TouchableOpacity onPress={() => navigation.navigate('DashboardInfo')}>
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

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View>{renderMainWeatherDisplayData()}</View>
      )}
    </View>
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
