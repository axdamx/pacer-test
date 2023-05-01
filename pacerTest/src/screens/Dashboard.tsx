import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Card from '../components/Card';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Screen</Text>
      <View>
        <Card name="Summer" />
        <Card name="Winter" />
        <Card name="Spring" />
        <Card name="Autumn" />
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

export default DashboardScreen;
