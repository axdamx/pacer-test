import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DashboardScreen from '../screens/Dashboard';
import DashboardInfoScreen from '../screens/DasboardInfo';

const DashboardStack = createNativeStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard">
      <DashboardStack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={DashboardScreen}
      />
      <DashboardStack.Screen
        options={{headerShown: false}}
        name="DashboardInfo"
        component={DashboardInfoScreen}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardStackNavigator;
