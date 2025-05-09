import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Minefield from './components/Minefield';

const App: React.FC = () => {
  const [settings, setSettings] = useState({
    boardSize: 5,
    minePercentage: 0.12,
    vibrationEnabled: true,
  });

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Minefield 
          settings={settings} 
          onSettingsChange={setSettings}
        />
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
