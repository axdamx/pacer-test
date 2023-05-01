import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Card from '../components/Card';

const SettingScreen = () => {
  return (
    <View>
      <Text>Setting Screen</Text>

      <ScrollView>
        <Card name="Summer" />
        <Card name="Winter" />
        <Card name="Spring" />
        <Card name="Autumn" />
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
