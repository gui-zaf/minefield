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
            <Text style={styles.titleText}>Como Jogar</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Objetivo do Jogo */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Objetivo</Text>
              <Text style={styles.text}>
                Encontre todas as células seguras do tabuleiro sem clicar em nenhuma mina. Use a lógica e os números como guia para determinar onde as minas estão escondidas.
              </Text>
            </View>

            {/* Controles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Controles</Text>
              <Text style={styles.text}>• Toque simples: Revela uma célula</Text>
              <Text style={styles.text}>• Toque longo: Coloca/remove uma bandeira 🚩</Text>
              <Text style={styles.text}>• Arraste vertical: Ajusta a posição do tabuleiro na tela</Text>
            </View>

            {/* Números e Significados */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Números e Significados</Text>
              <Text style={styles.text}>Cada número indica quantas minas estão nas células adjacentes (incluindo diagonais):</Text>
              <Text style={styles.numberText}>1 - uma mina próxima, 2 - duas minas próximas, 3 - três minas próximas, 4 - quatro minas próximas, 5 - cinco minas próximas, 6 - seis minas próximas, 7 - sete minas próximas, 8 - oito minas próximas</Text>
            </View>

            {/* Cabeçalho do Jogo */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cabeçalho do Jogo</Text>
              <Text style={styles.text}>• Display esquerdo: Número de minas restantes</Text>
              <Text style={styles.text}>• Display central: Botão de reiniciar jogo</Text>
              <Text style={styles.text}>• Display direito: Tempo decorrido</Text>
            </View>

            {/* Configurações */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Configurações ⚙️</Text>
              <Text style={styles.text}>No menu de configurações você pode:</Text>
              <Text style={styles.text}>• Escolher dificuldades predefinidas (Fácil, Médio, Difícil)</Text>
              <Text style={styles.text}>• Personalizar o tamanho do tabuleiro (5x5 até 10x10)</Text>
              <Text style={styles.text}>• Ajustar a porcentagem de minas (10% a 30%)</Text>
              <Text style={styles.text}>• Ativar/desativar vibração ao marcar bandeiras</Text>
            </View>

            {/* Como Ganhar */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Como Ganhar</Text>
              <Text style={styles.text}>
                Você vence quando revelar todas as células seguras do tabuleiro. Não é necessário marcar todas as minas com bandeiras, apenas evite clicar nelas!
              </Text>
            </View>

            {/* Dicas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dicas</Text>
              <Text style={styles.text}>• Use as bandeiras para marcar onde você tem certeza que há minas</Text>
              <Text style={styles.text}>• O primeiro clique nunca será uma mina</Text>
              <Text style={styles.text}>• Use o contador de minas restantes como guia</Text>
              <Text style={styles.text}>• Células sem número ao redor são sempre seguras</Text>
            </View>
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
    padding: 20,
  },
  modalView: {
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    width: '100%',
    maxHeight: '80%',
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
  content: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000080',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    lineHeight: 20,
  },
  numberText: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
    lineHeight: 20,
  },
});

export default HelpModal; 