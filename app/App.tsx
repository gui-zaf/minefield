import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Minefield from './components/Minefield';

const App: React.FC = () => {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Minefield />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#c0c0c0',
  },
  container: {
    flex: 1,
  },
});

export default App;
