/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import DashboardScreen from './src/screens/Dashboard';
import ProfileScreen from './src/screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS, PADDING, SIZES} from './src/contants/theme';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './src/reducers';
import {Provider} from 'react-redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import WeatherInfoScreen from './src/screens/WeatherInfoScreen';
import {slides} from './src/contants/const';

export type RootStackParams = {
  Dashboard: any;
  Goals: any;
  Setting: any;
  WeatherInfo: any;
};

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Main Dashboard"
        component={DashboardScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: '800',
          },
          headerBackTitleVisible: false,
        }}
      />
      <DashboardStack.Screen
        name="WeatherInfo"
        component={WeatherInfoScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: '800',
          },
          headerTintColor: COLORS.white,
        }}
      />
    </DashboardStack.Navigator>
  );
};

const middlewares = [];
const createDebugger = require('redux-flipper').default;
middlewares.push(createDebugger());

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

function App(): JSX.Element {
  const [showHomePage, setShowHomePage] = useState(false);
  const buttonLabel = (label: string) => {
    return (
      <View style={{padding: PADDING.default}}>
        <Text style={styles.onboardingLabel}>{label}</Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View style={styles.onboardingMainView}>
              <Image
                source={item.image}
                style={styles.onboardingImage}
                resizeMode="contain"
              />
              <Text style={styles.onboardingMainTitle}>{item.title}</Text>
              <Text style={styles.onboardingMainDescription}>
                {item.description}
              </Text>
            </View>
          );
        }}
        activeDotStyle={styles.dotStyle}
        showSkipButton
        renderNextButton={() => buttonLabel('Next')}
        renderSkipButton={() => buttonLabel('Skip')}
        renderDoneButton={() => buttonLabel('Done')}
        onDone={() => setShowHomePage(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.lightGrey,
            tabBarLabelStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="Dashboard"
            component={DashboardStackScreen}
            options={{
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({color}) => (
                <Icon name="history" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Goals"
            component={ProfileScreen}
            options={{
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({color}) => (
                <Icon name="face-man-profile" size={20} color={color} />
              ),
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTitleStyle: {
                color: COLORS.white,
                fontWeight: '800',
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  onboardingLabel: {
    color: COLORS.title,
    fontWeight: '600',
    fontSize: SIZES.h3,
  },
  onboardingMainView: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingTop: 100,
  },
  onboardingImage: {
    width: SIZES.width - 80,
    height: 400,
  },
  onboardingMainTitle: {
    fontWeight: 'bold',
    color: COLORS.title,
    fontSize: SIZES.h1,
  },
  onboardingMainDescription: {
    textAlign: 'center',
    paddingTop: 5,
    color: COLORS.title,
  },
  dotStyle: {
    backgroundColor: COLORS.primary,
    width: 30,
  },
});

export default App;
