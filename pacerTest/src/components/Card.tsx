import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  name: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Card = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.cardStyle}>
        <Text>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'grey',
    margin: 5,
    padding: 5,
  },
});

export default Card;
