import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface MinefieldStyles {
  container: ViewStyle;
  header: ViewStyle;
  difficultyContainer: ViewStyle;
  difficultyButton: ViewStyle;
  selectedDifficulty: ViewStyle;
  board: ViewStyle;
  row: ViewStyle;
  cell: ViewStyle;
  revealedCell: ViewStyle;
  cellText: TextStyle;
  helpButton: ViewStyle;
  helpButtonText: TextStyle;
  settingsButton: ViewStyle;
  settingsButtonText: TextStyle;
  number1: TextStyle;
  number2: TextStyle;
  number3: TextStyle;
  number4: TextStyle;
  number5: TextStyle;
  number6: TextStyle;
  number7: TextStyle;
  number8: TextStyle;
}

export const styles = StyleSheet.create<MinefieldStyles>({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#c0c0c0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  difficultyButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    backgroundColor: '#c0c0c0',
  },
  selectedDifficulty: {
    backgroundColor: '#a0a0a0',
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  board: {
    padding: 10,
    backgroundColor: '#c0c0c0',
    borderWidth: 3,
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c0c0c0',
    margin: 0,
  },
  revealedCell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c0c0c0',
    margin: 0,
  },
  cellText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#c0c0c0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
  },
  helpButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#c0c0c0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
  },
  settingsButtonText: {
    fontSize: 16,
  },
  // Classic Minesweeper number colors
  number1: {
    color: '#0000ff', // Blue
  },
  number2: {
    color: '#008000', // Green
  },
  number3: {
    color: '#ff0000', // Red
  },
  number4: {
    color: '#000080', // Navy Blue
  },
  number5: {
    color: '#800000', // Maroon
  },
  number6: {
    color: '#008080', // Teal
  },
  number7: {
    color: '#000000', // Black
  },
  number8: {
    color: '#808080', // Gray
  },
}); 