export const labels={combined:'Combined',ipl:'IPL',internationals:'International',knockouts:'Knockouts'};
export const split=v=>(v||'').split(';').map(s=>s.trim()).filter(s=>s&&s!=='Not observed');
export const memberships=p=>[...split(p['IPL teams']),...split(p['International teams'])];
const normalized=v=>(v||'').toLowerCase().replace('yashaswi','yashasvi').replace(/^ms dhoni$/,'mahendra singh dhoni').trim();
export function matches(p,s){return (!s.team||p.Team===s.team)&&(!s.search||normalized(p.Player).includes(normalized(s.search)));}
export function teamsForScope(d,scope){return d.TeamOptions.filter(t=>scope==='ipl'?t.Family==='IPL':scope==='internationals'?t.Family==='T20I':scope==='knockouts'?t['Has knockouts']:true);}
export function scoreRows(d,s,role=s.view==='bowlers'?'Bowler':'Batter',phase=role==='Bowler'?s.phase:'All'){return (s.team?d.RRTeamRankings:d.RRAllPlayerScores).filter(p=>p.Scope===s.scope&&p.Role===role&&p.Phase===phase&&(!s.team||p.Team===s.team));}
export function ranking(d,s){const rows=s.team?scoreRows(d,s).filter(p=>p.Eligible):d[s.view==='bowlers'?'RRBowlers':'RRBatters'];return rows.filter(p=>p.Scope===s.scope&&p.Phase===(s.view==='bowlers'?s.phase:'All')&&matches(p,s)&&p.Events>=s.minEvents&&p['PI ≥ 7 events']>=s.minHigh).sort((a,b)=>b['Final score']-a['Final score']||a['Player ID']-b['Player ID']);}
export function unranked(d,s){return s.search?scoreRows(d,s).filter(p=>!p.Eligible&&matches(p,s)).sort((a,b)=>b.Events-a.Events):[];}
export function pressure(d,s){return (s.team?d.RRTeamPressurePlayers:d.RRPressurePlayers).filter(p=>p.Scope===s.scope&&p.Role===s.role&&matches(p,s)&&p.Events>=s.minEvents&&p['High events']>=s.minHigh);}
export function innings(d,s){return d.RRInnings.filter(p=>p.Scope===s.scope&&p.Role===s.role&&matches(p,s)).sort((a,b)=>b['Innings score']-a['Innings score']).slice(0,5);}
export function bands(rows){return Array.from({length:9},(_,i)=>({band:i+1,count:rows.reduce((v,p)=>v+(p[`PI ${i+1} band`]||0),0)}));}
export function chartBands(d,s){if(s.universe!=='all')return bands(pressure(d,s));return (s.team?d.RRTeamPressureBands.filter(p=>p.Scope===s.scope&&p.Team===s.team&&p.Role===s.role):d.RRPressureBands.filter(p=>p.Scope===s.scope&&p.Universe==='All match deliveries')).map(p=>({band:p['Band start'],count:p.Events}));}
