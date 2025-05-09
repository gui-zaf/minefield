import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onApplySettings: (settings: GameSettings) => void;
  currentSettings: {
    boardSize: number;
    minePercentage: number;
    vibrationEnabled: boolean;
  };
}

export interface GameSettings {
  boardSize: number;
  minePercentage: number;
  vibrationEnabled: boolean;
}

const PRESET_DIFFICULTIES = {
  easy: { size: 5, percentage: 12 },
  medium: { size: 6, percentage: 15 },
  hard: { size: 8, percentage: 18 },
} as const;

type Difficulty = keyof typeof PRESET_DIFFICULTIES | 'custom';

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onApplySettings,
  currentSettings,
}) => {
  const [boardSize, setBoardSize] = useState(currentSettings.boardSize.toString());
  const [minePercentage, setMinePercentage] = useState((currentSettings.minePercentage * 100).toString());
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('custom');
  const [vibrationEnabled, setVibrationEnabled] = useState(currentSettings.vibrationEnabled);

  useEffect(() => {
    // Determine initial difficulty based on current settings
    const currentConfig = {
      size: currentSettings.boardSize,
      percentage: Math.round(currentSettings.minePercentage * 100),
    };

    const matchingDifficulty = (Object.entries(PRESET_DIFFICULTIES) as [Difficulty, typeof PRESET_DIFFICULTIES.easy][])
      .find(([_, config]) => config.size === currentConfig.size && config.percentage === currentConfig.percentage);

    setSelectedDifficulty(matchingDifficulty?.[0] ?? 'custom');
    setBoardSize(currentSettings.boardSize.toString());
    setMinePercentage((currentSettings.minePercentage * 100).toString());
    setVibrationEnabled(currentSettings.vibrationEnabled);
  }, [currentSettings]);

  const validateAndSetBoardSize = (value: string) => {
    // Remove qualquer caractere não numérico
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Limita a 2 dígitos
    if (numericValue.length > 2) return;
    
    // Converte para número para validação
    const size = parseInt(numericValue);
    
    // Se for um número válido, garante que esteja entre 5 e 10
    if (!isNaN(size)) {
      if (size < 5) {
        setBoardSize('5');
      } else if (size > 10) {
        setBoardSize('10');
      } else {
        setBoardSize(numericValue);
      }
    } else {
      // Se não for um número válido e o campo não estiver vazio, mantém o valor anterior
      if (numericValue !== '') {
        setBoardSize(boardSize);
      } else {
        setBoardSize('');
      }
    }
    setSelectedDifficulty('custom');
  };

  const validateAndSetMinePercentage = (value: string) => {
    // Remove qualquer caractere não numérico
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Limita a 2 dígitos
    if (numericValue.length > 2) return;

    // Permite digitar o número livremente
    setMinePercentage(numericValue);
    
    // Só valida os limites quando o usuário terminar de digitar (2 dígitos ou campo vazio)
    if (numericValue.length === 2 || numericValue === '') {
      const percentage = parseInt(numericValue);
      if (!isNaN(percentage)) {
        if (percentage < 10) {
          setMinePercentage('10');
        } else if (percentage > 30) {
          setMinePercentage('30');
        }
      }
    }
    
    setSelectedDifficulty('custom');
  };

  const handleApply = () => {
    // Validação final antes de aplicar as configurações
    const finalBoardSize = Math.min(10, Math.max(5, parseInt(boardSize) || 5));
    const finalPercentage = Math.min(30, Math.max(10, parseInt(minePercentage) || 15)) / 100;

    onApplySettings({
      boardSize: finalBoardSize,
      minePercentage: finalPercentage,
      vibrationEnabled,
    });
    onClose();
  };

  const setPresetDifficulty = (difficulty: Difficulty) => {
    Keyboard.dismiss();
    if (difficulty === 'custom') return;

    const config = PRESET_DIFFICULTIES[difficulty];
    setBoardSize(config.size.toString());
    setMinePercentage(config.percentage.toString());
    setSelectedDifficulty(difficulty);
  };

  const handleCustomInput = (value: string, isSize: boolean) => {
    setSelectedDifficulty('custom');
    if (isSize) {
      setBoardSize(value);
    } else {
      setMinePercentage(value);
    }
  };

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.titleBar}>
                <Text style={styles.titleText}>Configurações</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Dificuldades Predefinidas</Text>
                <View style={styles.presetButtons}>
                  <TouchableOpacity
                    style={[styles.presetButton, selectedDifficulty === 'easy' && styles.selectedPreset]}
                    onPress={() => setPresetDifficulty('easy')}
                  >
                    <Text>Fácil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.presetButton, selectedDifficulty === 'medium' && styles.selectedPreset]}
                    onPress={() => setPresetDifficulty('medium')}
                  >
                    <Text>Médio</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.presetButton, selectedDifficulty === 'hard' && styles.selectedPreset]}
                    onPress={() => setPresetDifficulty('hard')}
                  >
                    <Text>Difícil</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Jogo Personalizado</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Tamanho do Tabuleiro:</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={[styles.input, selectedDifficulty === 'custom' && styles.selectedInput, styles.percentageInput]}
                      value={boardSize}
                      onChangeText={validateAndSetBoardSize}
                      keyboardType="number-pad"
                      maxLength={2}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View style={[styles.input, styles.minesCountDisplay]}>
                      <Text>{(parseInt(boardSize) || 5) * (parseInt(boardSize) || 5)} células</Text>
                    </View>
                  </View>
                  <Text style={styles.hint}>Mínimo: 5, Máximo: 10</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Porcentagem de Minas (%):</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={[styles.input, selectedDifficulty === 'custom' && styles.selectedInput, styles.percentageInput]}
                      value={minePercentage}
                      onChangeText={validateAndSetMinePercentage}
                      keyboardType="number-pad"
                      maxLength={2}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View style={[styles.input, styles.minesCountDisplay]}>
                      <Text>{Math.floor((parseInt(boardSize) || 5) * (parseInt(boardSize) || 5) * (parseInt(minePercentage) || 15) / 100)} minas</Text>
                    </View>
                  </View>
                  <Text style={styles.hint}>Mínimo: 10%, Máximo: 30%</Text>
                </View>

                <Text style={styles.sectionTitle}>Configurações Adicionais</Text>
                <View style={styles.optionContainer}>
                  <Text style={styles.label}>Vibração ao marcar bandeira:</Text>
                  <TouchableOpacity
                    style={[styles.toggleButton, vibrationEnabled && styles.toggleButtonActive]}
                    onPress={() => setVibrationEnabled(!vibrationEnabled)}
                  >
                    <Text style={styles.toggleButtonText}>{vibrationEnabled ? 'Ativada' : 'Desativada'}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApply}
                >
                  <Text style={styles.applyButtonText}>Aplicar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    width: '90%',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    color: '#000',
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  presetButton: {
    padding: 10,
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedPreset: {
    backgroundColor: '#a0a0a0',
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#808080',
    padding: 8,
    fontSize: 14,
  },
  selectedInput: {
    borderWidth: 2,
    borderColor: '#000080',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  applyButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  percentageInput: {
    flex: 1,
  },
  minesCountDisplay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  optionContainer: {
    marginBottom: 15,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    alignItems: 'center',
    marginTop: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#a0a0a0',
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#000',
  },
});

export default SettingsModal; 