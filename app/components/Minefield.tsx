import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Vibration, Animated, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { styles } from '../styles/minefield.styles';
import HelpModal from './HelpModal';
import GameHeader from './GameHeader';
import SettingsModal, { GameSettings } from './SettingsModal';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'custom';
export type GameStatus = 'ready' | 'playing' | 'clicking' | 'won' | 'lost';

export type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type GameBoard = CellState[][];

const BOARD_SIZES = {
  easy: 5,
  medium: 6,
  hard: 8,
};

const MINE_PERCENTAGES = {
  easy: 0.12, // 12% of cells will be mines
  medium: 0.15, // 15% of cells will be mines
  hard: 0.18, // 18% of cells will be mines
};

interface MinefieldProps {
  settings: {
    boardSize: number;
    minePercentage: number;
    vibrationEnabled: boolean;
  };
  onSettingsChange: (settings: GameSettings) => void;
}

const Minefield: React.FC<MinefieldProps> = ({ settings, onSettingsChange }) => {
  const confettiRef = useRef<any>(null);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [flashOpacity] = useState(new Animated.Value(0));
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<GameBoard>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [flaggedMines, setFlaggedMines] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [customSettings, setCustomSettings] = useState<GameSettings>({
    boardSize: 5,
    minePercentage: 0.12,
    vibrationEnabled: settings.vibrationEnabled,
  });
  const [flagCount, setFlagCount] = useState(0);
  const [totalMines, setTotalMines] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);

  const getCurrentBoardSize = () => {
    return difficulty === 'custom' ? customSettings.boardSize : BOARD_SIZES[difficulty];
  };

  const getCurrentMinePercentage = () => {
    return difficulty === 'custom' ? customSettings.minePercentage : MINE_PERCENTAGES[difficulty];
  };

  const handleCustomSettings = (newSettings: GameSettings) => {
    setCustomSettings(newSettings);
    onSettingsChange(newSettings);
    setDifficulty('custom');
    startNewGame('custom', newSettings);
  };

  const startTimer = useCallback(() => {
    if (timerInterval) return;
    
    const interval = setInterval(() => {
      setGameTime(prev => {
        if (prev >= 999) {
          clearInterval(interval);
          return 999;
        }
        return prev + 1;
      });
    }, 1000);

    setTimerInterval(interval);
  }, [timerInterval]);

  const stopTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  const startNewGame = (newDifficulty: Difficulty, settings?: GameSettings) => {
    stopTimer();
    setDifficulty(newDifficulty);
    setGameStatus('ready');
    setGameTime(0);
    setFlaggedMines(0);
    setIsFirstClick(true);
    
    if (settings) {
      setCustomSettings(settings);
    }
    
    const boardSize = newDifficulty === 'custom' ? 
      (settings ? settings.boardSize : customSettings.boardSize) : 
      BOARD_SIZES[newDifficulty];
      
    const minePercentage = newDifficulty === 'custom' ? 
      (settings ? settings.minePercentage : customSettings.minePercentage) : 
      MINE_PERCENTAGES[newDifficulty];

    setBoard(initializeBoard(boardSize, minePercentage));
  };

  const initializeBoard = (size: number, minePercentage: number) => {
    const totalMines = Math.floor(size * size * minePercentage);
    
    const newBoard: GameBoard = Array(size).fill(null).map(() =>
      Array(size).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );

    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!newBoard[row][col].isMine) {
          newBoard[row][col].adjacentMines = countAdjacentMines(newBoard, row, col);
        }
      }
    }

    return newBoard;
  };

  const countAdjacentMines = (board: GameBoard, row: number, col: number): number => {
    let count = 0;
    const size = board.length;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        
        if (
          newRow >= 0 && 
          newRow < size && 
          newCol >= 0 && 
          newCol < size && 
          board[newRow][newCol].isMine
        ) {
          count++;
        }
      }
    }

    return count;
  };

  const triggerExplosionEffect = () => {
    // Strong vibration pattern for explosion
    Vibration.vibrate([0, 100, 100, 100, 100, 100]);
    
    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();

    // Red flash animation
    Animated.sequence([
      // Fade in quickly
      Animated.timing(flashOpacity, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true
      }),
      // Hold longer
      Animated.timing(flashOpacity, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true
      }),
      // Fade out more slowly
      Animated.timing(flashOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  };

  const revealCell = (row: number, col: number) => {
    if (gameStatus === 'won' || gameStatus === 'lost' || board[row][col].isFlagged || board[row][col].isRevealed) {
      return;
    }

    if (isFirstClick) {
      setIsFirstClick(false);
      startTimer();
      setGameStatus('playing');
    }

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (board[row][col].isMine && !isDevMode) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j].isMine) {
            newBoard[i][j].isRevealed = true;
          }
        }
      }
      setGameStatus('lost');
      stopTimer();
      setBoard(newBoard);
      triggerExplosionEffect();
      return;
    }

    if (board[row][col].adjacentMines === 0) {
      revealAdjacentCells(newBoard, row, col);
    }

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const revealAdjacentCells = (board: GameBoard, row: number, col: number) => {
    const size = board.length;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;

        if (
          newRow >= 0 &&
          newRow < size &&
          newCol >= 0 &&
          newCol < size &&
          !board[newRow][newCol].isRevealed &&
          !board[newRow][newCol].isFlagged &&
          !board[newRow][newCol].isMine
        ) {
          board[newRow][newCol].isRevealed = true;
          if (board[newRow][newCol].adjacentMines === 0) {
            revealAdjacentCells(board, newRow, newCol);
          }
        }
      }
    }
  };

  const toggleFlag = (row: number, col: number) => {
    if (gameStatus === 'won' || gameStatus === 'lost' || board[row][col].isRevealed) {
      return;
    }

    if (isFirstClick) {
      setIsFirstClick(false);
      startTimer();
      setGameStatus('playing');
    }

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    
    setFlaggedMines(prev => prev + (newBoard[row][col].isFlagged ? 1 : -1));
    
    // Vibrate when placing/removing a flag if enabled
    if (settings.vibrationEnabled) {
      Vibration.vibrate(1); // Reduced to 1ms for a very subtle vibration
    }
  };

  const checkWinCondition = (currentBoard: GameBoard) => {
    const size = currentBoard.length;
    let allNonMinesRevealed = true;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!currentBoard[row][col].isMine && !currentBoard[row][col].isRevealed) {
          allNonMinesRevealed = false;
          break;
        }
      }
    }

    if (allNonMinesRevealed) {
      setGameStatus('won');
      stopTimer();
    }
  };

  useEffect(() => {
    startNewGame('easy');
    return () => stopTimer();
  }, []);

  const handleCellPressIn = () => {
    if (gameStatus === 'playing') {
      setGameStatus('clicking');
    }
  };

  const handleCellPressOut = () => {
    if (gameStatus === 'clicking') {
      setGameStatus('playing');
    }
  };

  const getNumberStyle = (number: number) => {
    switch (number) {
      case 1: return styles.number1;
      case 2: return styles.number2;
      case 3: return styles.number3;
      case 4: return styles.number4;
      case 5: return styles.number5;
      case 6: return styles.number6;
      case 7: return styles.number7;
      case 8: return styles.number8;
      default: return {};
    }
  };

  return (
    <>
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{
              translateX: shakeAnimation
            }]
          }
        ]}
      >
        {/* Fixed Header Section */}
        <View style={styles.fixedHeaderSection}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => setHelpModalVisible(true)}
            >
              <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setSettingsModalVisible(true)}
            >
              <Text style={styles.settingsButtonText}>⚙️</Text>
            </TouchableOpacity>
          </View>

          <GameHeader
            remainingMines={Math.floor(getCurrentBoardSize() * getCurrentBoardSize() * getCurrentMinePercentage()) - flaggedMines}
            gameTime={gameTime}
            gameStatus={gameStatus}
            onReset={() => startNewGame(difficulty)}
            isDevMode={isDevMode}
            onDevModeActivate={() => setIsDevMode(prev => !prev)}
          />
        </View>

        {/* Scrollable Game Board */}
        <ScrollView 
          style={styles.boardContainer}
          contentContainerStyle={styles.boardContentContainer}
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => {
                  const isRevealed = cell.isRevealed;
                  const isMine = cell.isMine;
                  const cellStyle = isRevealed ? styles.revealedCell : styles.cell;
                  
                  const textStyle = [
                    styles.cellText,
                    isRevealed && !isMine && getNumberStyle(cell.adjacentMines),
                    isMine && isDevMode && styles.devModeMine
                  ];

                  return (
                    <TouchableOpacity
                      key={`${rowIndex}-${colIndex}`}
                      style={cellStyle}
                      onPress={() => revealCell(rowIndex, colIndex)}
                      onLongPress={() => toggleFlag(rowIndex, colIndex)}
                      onPressIn={handleCellPressIn}
                      onPressOut={handleCellPressOut}
                    >
                      <Text style={textStyle}>
                        {isRevealed
                          ? isMine
                            ? '💣'
                            : cell.adjacentMines > 0
                            ? cell.adjacentMines.toString()
                            : ''
                          : cell.isFlagged
                          ? '🚩'
                          : isDevMode && isMine
                          ? '💣'
                          : ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        <HelpModal
          visible={helpModalVisible}
          onClose={() => setHelpModalVisible(false)}
        />

        <SettingsModal
          visible={settingsModalVisible}
          onClose={() => setSettingsModalVisible(false)}
          onApplySettings={handleCustomSettings}
          currentSettings={{
            boardSize: getCurrentBoardSize(),
            minePercentage: getCurrentMinePercentage(),
            vibrationEnabled: settings.vibrationEnabled,
          }}
        />
      </Animated.View>

      {/* Red flash overlay */}
      <Animated.View 
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: 'red',
          opacity: flashOpacity,
          zIndex: 9999,
          elevation: 9999,
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Confetti effect - agora fora do container principal */}
      {gameStatus === 'won' && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          elevation: 10000,
          pointerEvents: 'none',
        }}>
          <ConfettiCannon
            count={500}
            origin={{ x: Dimensions.get('window').width / 2, y: 0 }}
            autoStart={true}
            fadeOut={true}
            fallSpeed={2500}
            explosionSpeed={400}
            colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98']}
          />
        </View>
      )}
    </>
  );
};

export default Minefield; 