import firestore from '@react-native-firebase/firestore';

export const getCollection = collectionName => firestore().collection(collectionName);
