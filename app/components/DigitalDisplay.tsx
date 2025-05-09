import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DigitalDisplayProps {
  value: number;
}

const DigitalDisplay: React.FC<DigitalDisplayProps> = ({ value }) => {
  // Ensure the value is between -99 and 999 and format it to 3 digits
  const formattedValue = Math.min(999, Math.max(-99, value))
    .toString()
    .padStart(3, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#300000', // Dark red background
    borderWidth: 2,
    borderTopColor: '#555',
    borderLeftColor: '#555',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
    padding: 4,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff0000', // Bright red for the digits
  },
});

export default DigitalDisplay; 