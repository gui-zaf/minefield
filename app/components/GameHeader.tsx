import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import DigitalDisplay from './DigitalDisplay';

interface GameHeaderProps {
  remainingMines: number;
  gameTime: number;
  gameStatus: 'ready' | 'playing' | 'clicking' | 'won' | 'lost';
  onReset: () => void;
  isDevMode: boolean;
  onDevModeActivate: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  remainingMines,
  gameTime,
  gameStatus,
  onReset,
  isDevMode,
  onDevModeActivate,
}) => {
  let pressTimer: NodeJS.Timeout | null = null;
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [canActivate, setCanActivate] = useState(false);

  const startPressTimer = useCallback(() => {
    setIsLongPressing(true);
    setCanActivate(false);
    pressTimer = setTimeout(() => {
      // Vibração forte para indicar que pode soltar
      Vibration.vibrate([0, 300]);
      setCanActivate(true);
    }, 5000);
  }, []);

  const clearPressTimer = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
    if (canActivate) {
      onDevModeActivate();
    }
    setIsLongPressing(false);
    setCanActivate(false);
  }, [canActivate, onDevModeActivate]);

  const getFaceEmoji = () => {
    if (canActivate) {
      return '✨';
    }
    if (isDevMode) {
      return '🐛';
    }
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
        style={[
          styles.faceButton,
          canActivate && styles.readyToActivate
        ]}
        onPress={onReset}
        onPressIn={startPressTimer}
        onPressOut={clearPressTimer}
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
  readyToActivate: {
    backgroundColor: '#e0e0e0',
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  faceEmoji: {
    fontSize: 24,
  },
});

export default GameHeader; 