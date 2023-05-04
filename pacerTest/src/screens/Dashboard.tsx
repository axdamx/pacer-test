import React, {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mainDashboardActions} from '../actions';
import {getIsFetching, weatherNameData} from '../selectors';
import {getWeatherApi} from '../api';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const name = useSelector(weatherNameData);

  const isFetching = useSelector(getIsFetching);

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

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View>
          <Text>{name}</Text>
          <Card
            name="Summer"
            onPress={() =>
              navigation.navigate('DashboardInfo', {
                title: 'Summer',
              })
            }
          />
          <Card name="Winter" />
          <Card name="Spring" />
          <Card name="Autumn" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 48,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default DashboardScreen;
