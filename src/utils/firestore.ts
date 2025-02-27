import { Firestore, getFirestore } from 'firebase/firestore';
import app from './firebase-config';

const db: Firestore = getFirestore(app);

export default db;
