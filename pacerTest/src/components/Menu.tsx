import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParams} from '../../App';

const Menu = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.cardStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Dashboard');
        }}>
        <Text style={styles.link}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Text style={styles.link}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        <Text style={styles.link}>Setting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'grey',
    marginTop: 8,
    padding: 16,
  },
  link: {
    color: 'blue',
    fontSize: 15,
  },
});

export default Menu;
