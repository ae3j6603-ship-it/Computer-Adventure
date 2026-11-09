import fs from 'node:fs';import path from 'node:path';import{execFileSync}from'node:child_process';
function scan(dir){for(const d of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,d.name);if(d.isDirectory()&&d.name!=='node_modules')scan(p);else if(/\.(js|mjs|cjs)$/.test(p)&&!p.includes('vendor'))execFileSync(process.execPath,['--check',p],{stdio:'inherit'});}}
scan('dist');scan('functions');scan('scripts');console.log('JavaScript syntax: OK');
