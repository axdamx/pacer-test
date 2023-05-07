import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
} from 'react-native';
import {COLORS} from '../contants/theme';
import {useDispatch} from 'react-redux';
import {mainDashboardActions} from '../actions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

const ProfileScreen = () => {
  const [dailySteps, setDailySteps] = useState(0);
  const [walkingGoals, setWalkingGoals] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const dispatch = useDispatch();

  const handleStepInput = text => {
    setDailySteps(text);
    checkInput();
  };

  const handleWalkingInput = text => {
    setWalkingGoals(text);
    checkInput();
  };

  const checkInput = () => {
    if (dailySteps !== 0 && walkingGoals !== 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handlePress = () => {
    const submitData = {
      dailySteps,
      walkingGoals,
    };
    console.log('submitData', submitData);
    dispatch(
      mainDashboardActions.submitStepsAndWalkingGoalsSuccess(submitData),
    );
    Keyboard.dismiss(); // Dismiss the keyboard after pressing the button
    navigation.navigate('Dashboard');
    setDailySteps(0);
    setWalkingGoals(0);
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.mainText}>Input your daily steps goals</Text>
      <TextInput
        placeholder="Number only"
        style={styles.input}
        onChangeText={handleStepInput}
        value={dailySteps.toString()}
        keyboardType="numeric"
      />
      <Text style={styles.mainText}>Input your walking goals</Text>
      <TextInput
        placeholder="Number only, in meter"
        style={styles.input}
        onChangeText={handleWalkingInput}
        value={walkingGoals.toString()}
        keyboardType="numeric"
      />
      <Button
        title="Save"
        color={COLORS.primary}
        onPress={handlePress}
        disabled={isButtonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainView: {
    padding: 15,
  },
});

export default ProfileScreen;
