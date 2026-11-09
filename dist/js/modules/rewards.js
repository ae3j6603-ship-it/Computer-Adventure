export const ITEM_IDS=['evolution','science','smart','ai','vehicle','problem','design','test','value','materials','mechanics','electronics'];
export const MISSION_IDS=['first','explorer','master'];
export function calculateRewards(ids,config){const unique=[...new Set(ids)];if(unique.some(id=>!ITEM_IDS.includes(id)))throw Error('ไอเทมไม่ถูกต้อง');const completedMissions=MISSION_IDS.filter(id=>unique.length>=config.missions[id].required);return {score:unique.reduce((sum,id)=>sum+config.points[id],0)+completedMissions.reduce((sum,id)=>sum+config.missions[id].reward,0),completedMissions}}
