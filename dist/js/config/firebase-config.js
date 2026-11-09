// Public Firebase web configuration. Never put service-account secrets in this file.
export const firebaseConfig = {"projectId": "computer-adventure-ae3j6603", "appId": "1:1078256503750:web:912945014c4b11c89040c7", "apiKey": "AIzaSyBqAurGL2eWhmYdnh-3MHjDXL6Zg_Cf8yU", "authDomain": "computer-adventure-ae3j6603.firebaseapp.com", "messagingSenderId": "1078256503750"};
// Spark project: Hosting + Google Auth + Firestore. No Functions or billing account.
export function getFirebaseConfig(){try{return firebaseConfig||JSON.parse(localStorage.getItem('ca-firebase-config')||'null')}catch{return null}}
