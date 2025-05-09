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
            <Text style={styles.sectionTitle}>Objetivo</Text>
            <Text style={styles.text}>
              Revelar todas as células seguras sem clicar em nenhuma mina.
            </Text>

            <Text style={styles.sectionTitle}>Controles</Text>
            <Text style={styles.text}>
              • Toque simples: Revela uma célula{'\n'}
              • Toque longo: Coloca/Remove uma bandeira 🚩
            </Text>

            <Text style={styles.sectionTitle}>Números e Cores</Text>
            <View style={styles.numberGrid}>
              <Text style={[styles.text, styles.number1]}>1</Text>
              <Text style={styles.text}>- Uma mina próxima</Text>
              <Text style={[styles.text, styles.number2]}>2</Text>
              <Text style={styles.text}>- Duas minas próximas</Text>
              <Text style={[styles.text, styles.number3]}>3</Text>
              <Text style={styles.text}>- Três minas próximas</Text>
              <Text style={[styles.text, styles.number4]}>4</Text>
              <Text style={styles.text}>- Quatro minas próximas</Text>
              <Text style={[styles.text, styles.number5]}>5</Text>
              <Text style={styles.text}>- Cinco minas próximas</Text>
              <Text style={[styles.text, styles.number6]}>6</Text>
              <Text style={styles.text}>- Seis minas próximas</Text>
              <Text style={[styles.text, styles.number7]}>7</Text>
              <Text style={styles.text}>- Sete minas próximas</Text>
              <Text style={[styles.text, styles.number8]}>8</Text>
              <Text style={styles.text}>- Oito minas próximas</Text>
            </View>

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