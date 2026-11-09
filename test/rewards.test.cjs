const {test}=require('node:test');const assert=require('node:assert/strict');const{calculateRewards}=require('../functions/rewards.cjs');
const items=[{id:'one',points:100},{id:'two',points:100}],missions=[{id:'first',required:1,reward:50},{id:'all',required:2,reward:150}];
test('collecting the same item twice never inflates XP',()=>assert.deepEqual(calculateRewards(['one','one'],items,missions),{score:150,completedMissions:['first']}));
test('unknown item IDs cannot unlock rewards',()=>assert.deepEqual(calculateRewards(['fake'],items,missions),{score:0,completedMissions:[]}));
test('each completed mission contributes its reward exactly once',()=>assert.deepEqual(calculateRewards(['one','two','two'],items,missions),{score:400,completedMissions:['first','all']}));
