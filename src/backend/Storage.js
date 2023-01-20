
import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeLogo = async (value) => {
    try {
      await AsyncStorage.setItem('@logo_animal', value)
    } catch (e) {
      // saving error
    }
  }

export const getLogo = async () => {
    try {
      const value = await AsyncStorage.getItem('@logo_animal')
      if(value !== null) {
        // value previously stored
        return value;
      }
    } catch(e) {
      // error reading value
      return 0;
    }
    return 0;
}