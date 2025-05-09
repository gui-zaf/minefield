import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DigitalDisplay from './DigitalDisplay';

interface GameHeaderProps {
  remainingMines: number;
  gameTime: number;
  gameStatus: 'ready' | 'playing' | 'clicking' | 'won' | 'lost';
  onReset: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  remainingMines,
  gameTime,
  gameStatus,
  onReset,
}) => {
  const getFaceEmoji = () => {
    switch (gameStatus) {
      case 'clicking':
        return '😮';
      case 'won':
        return '😎';
      case 'lost':
        return '😵';
      default:
        return '🙂';
    }
  };

  return (
    <View style={styles.container}>
      <DigitalDisplay value={remainingMines} />
      <TouchableOpacity
        style={styles.faceButton}
        onPress={onReset}
      >
        <Text style={styles.faceEmoji}>{getFaceEmoji()}</Text>
      </TouchableOpacity>
      <DigitalDisplay value={gameTime} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c0c0c0',
    padding: 10,
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    marginBottom: 10,
    width: '100%',
  },
  faceButton: {
    width: 40,
    height: 40,
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceEmoji: {
    fontSize: 24,
  },
});

export default GameHeader; 