import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
<<<<<<< HEAD
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
=======
import { getAuth, provideAuth } from '@angular/fire/auth';
>>>>>>> 73a88d2 (Added my config)

const firebaseConfig = {
  apiKey: 'AIzaSyCzRN8aPRSP6oNP2kR7sztL_ZqqyzfJTVk',
  authDomain: 'living-aura.firebaseapp.com',
  projectId: 'living-aura',
  storageBucket: 'living-aura.firebasestorage.app',
  messagingSenderId: '579401673753',
  appId: '1:579401673753:web:f0364e6b1abe81d5798e88',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
