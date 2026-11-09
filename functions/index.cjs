const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getFirestore,FieldValue}=require('firebase-admin/firestore');
initializeApp();const db=getFirestore();
// Only this trusted function writes inventory, XP, mission completion and ranking.
exports.collectItem=onCall({region:'asia-southeast1',maxInstances:10},async request=>{
if(!request.auth)throw new HttpsError('unauthenticated','กรุณาเข้าสู่ระบบ');
const uid=request.auth.uid,itemId=request.data?.itemId;if(typeof itemId!=='string'||!/^[-a-z0-9]{1,60}$/.test(itemId))throw new HttpsError('invalid-argument','ไอเทมไม่ถูกต้อง');
return db.runTransaction(async tx=>{
const itemRef=db.doc('items/'+itemId),invRef=db.doc('player_inventory/'+uid),progressRef=db.doc('player_progress/'+uid);
const [itemSnap,invSnap,itemList,missionList]=await Promise.all([tx.get(itemRef),tx.get(invRef),tx.get(db.collection('items')),tx.get(db.collection('missions'))]);
if(!itemSnap.exists||itemSnap.data().enabled===false)throw new HttpsError('not-found','ไม่พบไอเทม');
const ids=[...new Set([...(invSnap.data()?.ids||[]),itemId])];const {calculateRewards}=require('./rewards.cjs');const rewards=calculateRewards(ids,itemList.docs.map(d=>({...d.data(),id:d.id})),missionList.docs.map(d=>({...d.data(),id:d.id})));
tx.set(invRef,{ids,updatedAt:FieldValue.serverTimestamp()});tx.set(progressRef,{score:rewards.score,completedMissions:rewards.completedMissions,updatedAt:FieldValue.serverTimestamp()},{merge:true});tx.set(db.doc('leaderboard/'+uid),{displayName:request.auth.token.name||'นักสำรวจ',score:rewards.score,itemCount:ids.length,updatedAt:FieldValue.serverTimestamp()});return {ids,...rewards};
});});
