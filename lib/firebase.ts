import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1AaqEttXod050boTlDPX5v-wdInzAuck',
  authDomain: 'portfolio-yasser-e9be5.firebaseapp.com',
  projectId: 'portfolio-yasser-e9be5',
  storageBucket: 'portfolio-yasser-e9be5.firebasestorage.app',
  messagingSenderId: '694365042684',
  appId: '1:694365042684:web:ebf113aa3b8e7b42872479',
  measurementId: 'G-Y0J396TPWQ'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
