import {test} from 'node:test';import assert from 'node:assert/strict';import {calculateRewards} from '../dist/js/modules/rewards.js';import {seedItems,seedMissions} from '../dist/js/modules/content.js';
const config={points:Object.fromEntries(seedItems.map(i=>[i.id,i.points])),missions:Object.fromEntries(seedMissions.map(m=>[m.id,{required:m.required,reward:m.reward}]))};
test('duplicate IDs do not inflate XP',()=>assert.equal(calculateRewards(['evolution','evolution'],config).score,150));
test('unknown item IDs cannot unlock rewards',()=>assert.throws(()=>calculateRewards(['fake'],config)));
test('each completed mission contributes its reward once',()=>assert.deepEqual(calculateRewards(seedItems.map(i=>i.id),config),{score:1700,completedMissions:['first','explorer','master']}));
