import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DashboardScreen from '../screens/Dashboard';
import ProfileScreen from '../screens/Profile';
import SettingScreen from '../screens/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
// const RootStack = createNativeStackNavigator();

// function MyStack() {
//   return (
//     <RootStack.Navigator initialRouteName="Dashboard">
//         <RootStack.Screen name="Dashboard" component={DashboardScreen} />
//         <RootStack.Screen name="Profile" component={ProfileScreen} />
//         <RootStack.Screen name="Setting" component={SettingScreen} />
//     </RootStack.Navigator>
//   );
const Navigator = () => {
  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  const mainStack = () => {
    return (
      <Stack.Navigator initialRouteName="Dashboard">
        <Tabs.Screen name="Dashboard" component={DashboardScreen} />
        <Tabs.Screen name="Profile" component={ProfileScreen} />
        <Tabs.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    );
  };
  const secondStack = () => {
    //Import the other screens you use!
    return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={mainStack} />
        <Stack.Screen name="Second" component={secondStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
