import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGHSCORE_KEY = '@minefield:highscore';

export const saveHighScore = async (score: number) => {
  try {
    const currentHighScore = await getHighScore();
    if (score > currentHighScore) {
      await AsyncStorage.setItem(HIGHSCORE_KEY, score.toString());
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
};

export const getHighScore = async (): Promise<number> => {
  try {
    const score = await AsyncStorage.getItem(HIGHSCORE_KEY);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    console.error('Error getting high score:', error);
    return 0;
  }
}; 