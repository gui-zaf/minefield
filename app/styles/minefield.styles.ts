import { StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';

interface MinefieldStyles {
  container: ViewStyle;
  fixedHeaderSection: ViewStyle;
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
  boardContainer: ViewStyle;
  boardContentContainer: ViewStyle;
  devModeMine: TextStyle;
}

const HEADER_HEIGHT = 140; // Altura fixa do header
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create<MinefieldStyles>({
  container: {
    flex: 1,
    backgroundColor: '#c0c0c0',
  },
  fixedHeaderSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#c0c0c0',
    zIndex: 1,
    paddingHorizontal: 8,
    height: HEADER_HEIGHT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#c0c0c0',
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
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
    alignSelf: 'center',
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
  boardContainer: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
  },
  boardContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: windowHeight - HEADER_HEIGHT,
    paddingVertical: 20,
  },
  devModeMine: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0000',
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
}); 