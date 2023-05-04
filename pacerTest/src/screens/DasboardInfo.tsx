import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {weatherNameData} from '../selectors';

const DashboardInfoScreen = () => {
  const newOne = useSelector(weatherNameData);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Screen</Text>
      <View>
        <Text>{newOne}</Text>
      </View>
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

export default DashboardInfoScreen;
