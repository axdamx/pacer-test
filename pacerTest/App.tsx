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
import SettingScreen from './src/screens/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Image, View} from 'react-native';
import {COLORS, SIZES} from './src/contants/theme';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardInfoScreen from './src/screens/DasboardInfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import rootSaga from './src/sagas';
import rootReducer from './src/reducers';
import {Provider, useDispatch} from 'react-redux';
import {composeWithDevTools} from '@redux-devtools/extension';

const slides = [
  {
    id: 1,
    title: 'Discover Best Places',
    description:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require('./src/assets/onboardScreen1.png'),
  },
  {
    id: 2,
    title: 'Choose A Tasty Dish',
    description:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require('./src/assets/onboardScreen2.png'),
  },
  {
    id: 3,
    title: 'Pick Up The Delivery',
    description:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require('./src/assets/onboardScreen3.png'),
  },
];

export type RootStackParams = {
  Dashboard: any;
  Profile: any;
  Setting: any;
};

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: '800',
          },
          headerBackTitleVisible: false, // this
        }}
      />
      <DashboardStack.Screen
        name="DashboardInfo"
        component={DashboardInfoScreen}
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

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const createDebugger = require('redux-flipper').default;
middlewares.push(createDebugger());

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

function App(): JSX.Element {
  const [showHomePage, setShowHomePage] = useState(false);
  const buttonLabel = (label: string) => {
    return (
      <View style={{padding: 12}}>
        <Text
          style={{color: COLORS.title, fontWeight: '600', fontSize: SIZES.h3}}>
          {label}
        </Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 15,
                paddingTop: 100,
              }}>
              <Image
                source={item.image}
                style={{width: SIZES.width - 80, height: 400}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.title,
                  fontSize: SIZES.h1,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 5,
                  color: COLORS.title,
                }}>
                {item.description}
              </Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
          width: 30,
        }}
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
              tabBarIcon: ({color}) => (
                <Icon name="history" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
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
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="cogs" size={20} color={color} />
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

export default App;
