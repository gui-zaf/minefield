import { StyleSheet, ViewStyle } from 'react-native';

interface AppStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<AppStyles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 