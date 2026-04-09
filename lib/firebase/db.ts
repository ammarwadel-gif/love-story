import { db } from './config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// جلب جميع الذكريات
export async function getMemories() {
  const snapshot = await getDocs(collection(db, 'memories'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// إضافة ذكري جديدة
export async function addMemory(memory: any) {
  return await addDoc(collection(db, 'memories'), memory);
}

// جلب جميع الرسائل
export async function getMessages() {
  const snapshot = await getDocs(collection(db, 'messages'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// تحديث بيانات المستخدم
export async function updateUser(userId: string, data: any) {
  const userRef = doc(db, 'users', userId);
  return await updateDoc(userRef, data);
}