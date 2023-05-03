import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Card from '../components/Card';
import Menu from '../components/Menu';
import {useNavigation} from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Screen</Text>
      <View>
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
      <Menu />
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
