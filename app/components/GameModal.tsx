import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameModalProps {
  visible: boolean;
  isVictory: boolean;
  onRestart: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ visible, isVictory, onRestart }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isVictory ? (
            <>
              <Text style={styles.modalText}>🎉 Parabéns! 🎉</Text>
              <Text style={styles.messageText}>Você é incrível! Conseguiu desarmar todas as minas!</Text>
            </>
          ) : (
            <>
              <Text style={styles.modalText}>💣 BOOM!</Text>
              <Text style={styles.messageText}>Você estaria em pedaços agora se isso fosse a vida real :)</Text>
            </>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={onRestart}
          >
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default GameModal; 