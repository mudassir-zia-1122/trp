import { db } from '../firebase/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc, 
  updateDoc,
  getDoc 
} from 'firebase/firestore';

export const createBooking = async (bookingData) => {
  try {
    const bookingRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingRef, {
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, 'bookings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    throw error;
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    await updateDoc(doc(db, 'bookings', bookingId), { status });
  } catch (error) {
    throw error;
  }
};
