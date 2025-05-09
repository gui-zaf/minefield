import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';

interface TutorialProps {
  visible: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Bem-vindo ao Campo Minado!',
    description: 'O objetivo é revelar todas as células sem minas. Vamos aprender como jogar!',
  },
  {
    title: 'Revelando Células',
    description: 'Toque em uma célula para revelá-la. Se houver um número, ele indica quantas minas estão ao redor.',
  },
  {
    title: 'Marcando Minas',
    description: 'Pressione e segure uma célula para marcar onde você acha que há uma mina com uma bandeira 🚩',
  },
  {
    title: 'Células Vazias',
    description: 'Quando você revelar uma célula vazia, todas as células vazias adjacentes também serão reveladas automaticamente.',
  },
  {
    title: 'Vencendo o Jogo',
    description: 'Revele todas as células sem minas para vencer! Cuidado para não revelar uma mina, ou você perderá! 💣',
  },
];

const Tutorial: React.FC<TutorialProps> = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (visible) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < tutorialSteps.length - 1) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.tutorialCard}>
          <Text style={styles.title}>{tutorialSteps[currentStep].title}</Text>
          <Text style={styles.description}>{tutorialSteps[currentStep].description}</Text>
          <View style={styles.progressContainer}>
            {tutorialSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.activeProgressDot,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={onClose}>
            <Text style={styles.skipText}>Pular Tutorial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeProgressDot: {
    backgroundColor: '#333',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#666',
    fontSize: 14,
  },
});

export default Tutorial; 