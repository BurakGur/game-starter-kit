import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const exitUser = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};

export const getEmailForLogoutUser = async () => {
  try {
    const getUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(getUser);
    await AsyncStorage.removeItem('user');
    return user && user.email;
  } catch (error) {
    console.log(error);
  }
};
