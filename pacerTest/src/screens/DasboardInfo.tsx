import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const DashboardInfoScreen = ({route}) => {
  const data = route.params.title;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Screen</Text>
      <View>
        <Text>{data}</Text>
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
