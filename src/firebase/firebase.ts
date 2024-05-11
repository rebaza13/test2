// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBS49B9JBBrqHAiDVI2rX6um3Y9bLKdysg',
  authDomain: 'rebaztodo.firebaseapp.com',
  projectId: 'rebaztodo',
  storageBucket: 'rebaztodo.appspot.com',
  messagingSenderId: '730065768477',
  appId: '1:730065768477:web:835e74e8ba3eab737676f4'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
