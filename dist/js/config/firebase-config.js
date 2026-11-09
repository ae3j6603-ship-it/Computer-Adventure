// Public Firebase web configuration. Never put service-account secrets in this file.
export const firebaseConfig = null;
// Replace null with {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId}
// or configure the current browser through Admin > ตั้งค่า Firebase.
export function getFirebaseConfig(){try{return firebaseConfig||JSON.parse(localStorage.getItem('ca-firebase-config')||'null')}catch{return null}}
