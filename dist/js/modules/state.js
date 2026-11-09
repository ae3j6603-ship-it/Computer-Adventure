const key='computer-adventure-guest-v1';
export function loadLocal(){try{const s=JSON.parse(localStorage.getItem(key));return {ids:Array.isArray(s?.ids)?s.ids.filter(x=>typeof x==='string'):[],position:s?.position||{x:0,z:9}}}catch{return{ids:[],position:{x:0,z:9}}}}
export function saveLocal(state){localStorage.setItem(key,JSON.stringify(state))}
export function localCatalog(fallback,type){try{const x=JSON.parse(localStorage.getItem('ca-'+type));return Array.isArray(x)&&x.length?x:fallback}catch{return fallback}}
export const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
