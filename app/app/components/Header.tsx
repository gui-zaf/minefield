import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  gameOver: boolean;
  gameWon: boolean;
  onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({ gameOver, gameWon, onRestart }) => {
  const getFaceEmoji = () => {
    if (gameOver) return '😵';
    if (gameWon) return '😎';
    return '🙂';
  };

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.digitalText}>000</Text>
      </View>
      <TouchableOpacity onPress={onRestart} style={styles.faceButton}>
        <Text style={styles.faceEmoji}>{getFaceEmoji()}</Text>
      </TouchableOpacity>
      <View style={styles.counter}>
        <Text style={styles.digitalText}>000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
    marginBottom: 20,
    width: '100%',
  },
  counter: {
    backgroundColor: '#000',
    padding: 5,
    borderWidth: 1,
    borderColor: '#808080',
  },
  digitalText: {
    color: '#f00',
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
  },
  faceButton: {
    backgroundColor: '#c0c0c0',
    padding: 5,
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceEmoji: {
    fontSize: 24,
  },
});

export default Header; 