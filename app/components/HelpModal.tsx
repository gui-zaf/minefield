import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>Campo Minado - Ajuda</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            <Text style={styles.sectionTitle}>Bem-vindo ao Campo Minado!</Text>
            <Text style={styles.text}>
              O objetivo é revelar todas as células sem minas. Vamos aprender como jogar!
            </Text>

            <Text style={styles.sectionTitle}>Revelando Células</Text>
            <Text style={styles.text}>
              Toque em uma célula para revelá-la. Se houver um número, ele indica quantas minas estão ao redor.
            </Text>

            <Text style={styles.sectionTitle}>Números e Cores</Text>
            <View style={styles.numberGrid}>
              <Text style={[styles.text, styles.number1]}>1</Text>
              <Text style={styles.text}>- uma mina próxima</Text>
              <Text style={[styles.text, styles.number2]}>2</Text>
              <Text style={styles.text}>- duas minas próximas</Text>
              <Text style={[styles.text, styles.number3]}>3</Text>
              <Text style={styles.text}>- três minas próximas</Text>
              <Text style={styles.text}>n - n minas próximas</Text>
            </View>

            <Text style={styles.sectionTitle}>Marcando Minas</Text>
            <Text style={styles.text}>
              Pressione e segure uma célula para marcar onde você acha que há uma mina com uma bandeira 🚩
            </Text>

            <Text style={styles.sectionTitle}>Células Vazias</Text>
            <Text style={styles.text}>
              Quando você revelar uma célula vazia, todas as células vazias adjacentes também serão reveladas automaticamente.
            </Text>

            <Text style={styles.sectionTitle}>Dicas</Text>
            <Text style={styles.text}>
              • Use as bandeiras para marcar onde você acha que tem minas{'\n'}
              • Os números mostram quantas minas existem ao redor da célula{'\n'}
              • Células vazias não têm minas ao redor{'\n'}
              • O contador da esquerda mostra as minas restantes{'\n'}
              • O contador da direita mostra o tempo de jogo
            </Text>

            <Text style={styles.sectionTitle}>Níveis</Text>
            <Text style={styles.text}>
              • Fácil: Grade 5x5{'\n'}
              • Médio: Grade 6x6{'\n'}
              • Difícil: Grade 8x8
            </Text>
          </ScrollView>
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
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    maxHeight: '80%',
    width: '90%',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000080',
    padding: 8,
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    width: 24,
    height: 24,
    backgroundColor: '#c0c0c0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  scrollView: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#000',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
    marginBottom: 10,
  },
  numberGrid: {
    marginVertical: 10,
  },
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

export default HelpModal; 