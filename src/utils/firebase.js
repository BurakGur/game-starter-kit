import firestore from '@react-native-firebase/firestore';

export const collection = collectionName => firestore().collection(collectionName);

export const getCollection = collectionName => collection(collectionName).get();
