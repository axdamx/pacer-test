import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  name: string;
}

const Card = (props: Props) => {
  return (
    <View style={styles.cardStyle}>
      <Text>{props.name}</Text>
    </View>
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
