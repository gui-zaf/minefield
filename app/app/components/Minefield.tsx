import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles } from '../styles/minefield.styles';
import Header from './Header';
import Tutorial from './Tutorial';
import { saveHighScore, getHighScore } from '../utils/storage';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type GameBoard = CellState[][];

const BOARD_SIZES = {
  easy: 5,
  medium: 8,
  hard: 10,
};

const MINE_PERCENTAGES = {
  easy: 0.12,
  medium: 0.15,
  hard: 0.18,
};

const DIFFICULTY_LABELS = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

const Minefield: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<GameBoard>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    const score = await getHighScore();
    setHighScore(score);
  };

  const initializeBoard = (difficulty: Difficulty): GameBoard => {
    const size = BOARD_SIZES[difficulty];
    const minePercentage = MINE_PERCENTAGES[difficulty];
    const totalMines = Math.floor(size * size * minePercentage);
    
    // Create empty board
    const newBoard: GameBoard = Array(size).fill(null).map(() =>
      Array(size).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines
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

  const calculateScore = (board: GameBoard): number => {
    const size = board.length;
    let revealed = 0;
    let total = 0;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!board[row][col].isMine) {
          total++;
          if (board[row][col].isRevealed) {
            revealed++;
          }
        }
      }
    }

    const baseScore = Math.floor((revealed / total) * 100);
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    }[difficulty];

    return Math.floor(baseScore * difficultyMultiplier);
  };

  const revealCell = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].isFlagged || board[row][col].isRevealed) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (board[row][col].isMine) {
      setGameOver(true);
      Alert.alert(
        'Game Over',
        'Você atingiu uma mina!',
        [
          {
            text: 'Jogar Novamente',
            onPress: () => startNewGame(difficulty),
          },
        ]
      );
      return;
    }

    if (board[row][col].adjacentMines === 0) {
      revealAdjacentCells(newBoard, row, col);
    }

    setBoard(newBoard);
    const newScore = calculateScore(newBoard);
    setCurrentScore(newScore);
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
    if (gameOver || gameWon || board[row][col].isRevealed) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  const checkWinCondition = async (currentBoard: GameBoard) => {
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
      setGameWon(true);
      const finalScore = calculateScore(currentBoard);
      const isNewHighScore = await saveHighScore(finalScore);
      if (isNewHighScore) {
        setHighScore(finalScore);
        Alert.alert(
          'Parabéns!',
          `Você venceu com um novo recorde de ${finalScore} pontos!`,
          [
            {
              text: 'Jogar Novamente',
              onPress: () => startNewGame(difficulty),
            },
          ]
        );
      } else {
        Alert.alert(
          'Parabéns!',
          `Você venceu com ${finalScore} pontos!`,
          [
            {
              text: 'Jogar Novamente',
              onPress: () => startNewGame(difficulty),
            },
          ]
        );
      }
    }
  };

  const startNewGame = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setGameOver(false);
    setGameWon(false);
    setCurrentScore(0);
    setBoard(initializeBoard(newDifficulty));
  };

  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    let content = '';
    const cellStyle = cell.isRevealed ? styles.revealedCell : styles.cell;

    if (cell.isRevealed) {
      if (cell.isMine) {
        content = '💣';
      } else {
        content = cell.adjacentMines > 0 ? cell.adjacentMines.toString() : '';
      }
    } else if (cell.isFlagged) {
      content = '🚩';
    }

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={cellStyle}
        onPress={() => revealCell(row, col)}
        onLongPress={() => toggleFlag(row, col)}
      >
        <Text style={styles.cellText}>{content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        gameOver={gameOver}
        gameWon={gameWon}
        onRestart={() => startNewGame(difficulty)}
      />
      <View style={styles.scrollView}>
        <View style={styles.scrollContent}>
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => renderCell(rowIndex, colIndex))}
              </View>
            ))}
          </View>
        </View>
      </View>
      <Tutorial visible={showTutorial} onClose={() => setShowTutorial(false)} />
    </View>
  );
};

export default Minefield; 