import {getFirebaseConfig} from '../config/firebase-config.js';
let sdk=null;export async function connect(){if(sdk)return sdk;const config=getFirebaseConfig();if(!config?.projectId||!config?.apiKey)throw Error('ยังไม่ได้ตั้งค่า Firebase กรุณาเปิดหน้าผู้ดูแล → ตั้งค่า Firebase');const [a,auth,fs,fn]=await Promise.all([import('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'),import('https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'),import('https://www.gstatic.com/firebasejs/11.0.2/firebase-functions.js')]);const app=a.initializeApp(config);sdk={...auth,...fs,...fn,auth:auth.getAuth(app),db:fs.getFirestore(app),functions:fn.getFunctions(app,'asia-southeast1')};return sdk}
export async function loginGoogle(){const s=await connect();const r=await s.signInWithPopup(s.auth,new s.GoogleAuthProvider());await s.setDoc(s.doc(s.db,'users',r.user.uid),{displayName:r.user.displayName||'นักสำรวจ',photoURL:r.user.photoURL||'',updatedAt:s.serverTimestamp()},{merge:true});return r.user}
export async function observeUser(cb){const s=await connect();return s.onAuthStateChanged(s.auth,cb)}
export async function loadPlayer(uid){const s=await connect();const [p,inv]=await Promise.all([s.getDoc(s.doc(s.db,'player_progress',uid)),s.getDoc(s.doc(s.db,'player_inventory',uid))]);return {position:p.data()?.position,ids:inv.data()?.ids||[],score:p.data()?.score||0}}
export async function savePosition(uid,position){const s=await connect();await s.setDoc(s.doc(s.db,'player_progress',uid),{position,updatedAt:s.serverTimestamp()},{merge:true})}
export async function collectCloud(itemId){const s=await connect();return (await s.httpsCallable(s.functions,'collectItem')({itemId})).data}
export async function getCatalog(type){const s=await connect();return (await s.getDocs(s.collection(s.db,type))).docs.map(d=>({...d.data(),id:d.id}))}
export async function isAdmin(user){if(!user)return false;return !!(await user.getIdTokenResult(true)).claims.admin}
export async function saveRecord(type,id,data){const s=await connect();await s.setDoc(s.doc(s.db,type,id),data,{merge:true})}
export async function deleteRecord(type,id){const s=await connect();await s.deleteDoc(s.doc(s.db,type,id))}
export async function signOut(){const s=await connect();await s.signOut(s.auth)}
export async function leaderboard(){const s=await connect();return(await s.getDocs(s.query(s.collection(s.db,'leaderboard'),s.orderBy('score','desc'),s.limit(30)))).docs.map(d=>({id:d.id,...d.data()}))}
