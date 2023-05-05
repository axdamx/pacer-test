import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {weatherDataLol} from '../selectors';
import WeatherDetailsInfo from '../components/WeatherDetailsInfo';

const DashboardInfoScreen = () => {
  const mainData = useSelector(weatherDataLol);
  console.log('maindata', mainData);
  const {
    main: {temp},
    weather: [details],
    name,
  } = mainData;
  const {icon, main, description} = details;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={{flex: 1}}>
      <View style={styles.weatherInfo}>
        <Text>{name}</Text>
        <Image style={styles.weatherIcon} source={{uri: iconUrl}} />
        <Text style={styles.textPrimary}>{temp}°</Text>
        <Text style={styles.weatherDescription}>{description}</Text>
        <Text style={styles.textSecondary}>{main}</Text>
      </View>
      <WeatherDetailsInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  weatherInfo: {
    marginTop: 50,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: 'capitalize',
  },
  textPrimary: {
    fontSize: 40,
    color: 'black',
  },
  textSecondary: {
    fontSize: 20,
    color: 'grey',
    fontWeight: '500',
    marginTop: 10,
  },
});

export default DashboardInfoScreen;
