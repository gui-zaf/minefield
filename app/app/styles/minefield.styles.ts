import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface MinefieldStyles {
  container: ViewStyle;
  board: ViewStyle;
  row: ViewStyle;
  cell: ViewStyle;
  revealedCell: ViewStyle;
  cellText: TextStyle;
  scrollView: ViewStyle;
  scrollContent: ViewStyle;
}

export const styles = StyleSheet.create<MinefieldStyles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#c0c0c0',
  },
  board: {
    padding: 10,
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    margin: 1,
  },
  revealedCell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 1,
  },
  cellText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 