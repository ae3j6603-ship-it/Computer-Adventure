import {createRequire} from 'node:module';import {resolve} from 'node:path';
import {seedItems,seedMissions} from '../dist/js/modules/content.js';
const require=createRequire(resolve('functions/package.json'));
const {initializeApp,applicationDefault}=require('firebase-admin/app');const {getFirestore,FieldValue}=require('firebase-admin/firestore');const {getAuth}=require('firebase-admin/auth');
const args=process.argv.slice(2),option=key=>args[args.indexOf(key)+1];
if(!args.includes('--project')||!option('--project')||option('--project').startsWith('--'))throw Error('Usage: npm run bootstrap -- --project FIREBASE_PROJECT_ID [--admin-email EMAIL]');
initializeApp({credential:applicationDefault(),projectId:option('--project')});const db=getFirestore();
for(const [collection,records]of [['items',seedItems],['missions',seedMissions]]){for(const record of records){await db.runTransaction(async tx=>{const ref=db.doc(collection+'/'+record.id);if(!(await tx.get(ref)).exists)tx.create(ref,record)})}console.log(collection+': ready')}
const worldRef=db.doc('game_settings/world');if(!(await worldRef.get()).exists)await worldRef.create({title:'Computer Adventure',itemCount:12,updatedAt:FieldValue.serverTimestamp()});
if(args.includes('--admin-email')){const auth=getAuth();const user=await auth.getUserByEmail(option('--admin-email'));await auth.setCustomUserClaims(user.uid,{...user.customClaims,admin:true});console.log('Admin role assigned. Sign out and sign in again to refresh permissions.')}
console.log('Bootstrap complete. Existing lessons and player data were preserved.');
