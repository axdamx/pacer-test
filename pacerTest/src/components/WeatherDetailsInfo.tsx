import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {weatherDataLol} from '../selectors';

const WeatherDetailsInfo = () => {
  const mainData = useSelector(weatherDataLol);
  const {
    main: {feels_like, humidity, pressure},
    wind: {speed},
  } = mainData;

  const windSpeed = `${Math.round(speed)} m/s`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: 'grey',
          }}>
          <View style={styles.weatherDetailsRow}>
            <Icon name="airballoon" size={25} color={'black'} />
            <View style={styles.weatherDetailsItems}>
              <Text>Feels like :</Text>
              <Text style={styles.textSecondary}>{feels_like} °</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <Icon name="water" size={30} color={'black'} />
            <View style={styles.weatherDetailsItems}>
              <Text>Humidity :</Text>
              <Text style={styles.textSecondary}>{humidity} %</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: 'grey',
        }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: 'grey',
          }}>
          <View style={styles.weatherDetailsRow}>
            <Icon name="weather-windy" size={30} color={'black'} />
            <View style={styles.weatherDetailsItems}>
              <Text>Wind Speed :</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <Icon name="speedometer" size={30} color={'black'} />
            <View style={styles.weatherDetailsItems}>
              <Text>Pressure :</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    margin: 7,
  },
});

export default WeatherDetailsInfo;
