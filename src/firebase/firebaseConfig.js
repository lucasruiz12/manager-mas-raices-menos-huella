import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Variables de entorno desde Vite
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

// Configuración de Firebase
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notificationsCollection = collection(db, "notifications")

// 🔹 Función para guardar una notificación en Firestore
const saveNotification = async ({ title, body, timestamp }) => {
  try {
    const docRef = await addDoc(notificationsCollection, {
      title,
      body,
      timestamp,
    });
    console.log("Notificación guardada con ID:", docRef.id);
  } catch (e) {
    console.error("Error al guardar la notificación:", e);
  };
};

// 🔹 Función para obtener todas las notificaciones de Firestore
const fetchNotifications = async () => {
  try {
    const querySnapshot = await getDocs(notificationsCollection);
    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notifications;
  } catch (e) {
    console.error("Error al obtener notificaciones:", e);
    return [];
  };
};

export { db, saveNotification, fetchNotifications };