/* CommonRoom simulations: NPC characters placed in each map, and branching
   teaching scenarios that open in a private panel for the student who talks to them.
   Shared by the 2D page (index.html) and the 3D page (3d/index.html).
   To add a scenario: add an entry to SC, then place an NPC for it in NPCS. */
window.CRSim=(function(){
'use strict';

/* ---------- characters ---------- */
/* look fields match the avatar builder: color, skin, hair, hc, outfit, pc, acc (indexes for 2D), model = 3D builder string (av-sex-hair-outfit-shoes-hat-brows-eyes-topColor-bottomColor) */
const NPCS={
 classroom:[
  {id:'rivera',name:'Ms. Rivera',tag:'Mentor',x:5,y:3,dir:'down',sc:'offtask',greet:'Can you take over the warm-up for a few minutes?',
   look:{color:6,skin:2,hair:3,hc:1,outfit:3,pc:2,acc:3,model:'av-f-4-7-4-0-3-0-0-0'}}],
 library:[
  {id:'patel',name:'Mrs. Patel',tag:'Parent',x:23,y:9,dir:'left',sc:'parent',greet:'Are you Arjun\'s teacher? I need to talk to you.',
   look:{color:4,skin:3,hair:1,hc:1,outfit:2,pc:0,acc:0,model:'av-f-6-5-3-0-3-1-12-0'}}],
 quad:[
  {id:'maya',name:'Maya',tag:'Student',x:15,y:12,dir:'right',sc:'recess',greet:'It was OUR turn with the ball!',
   look:{color:5,skin:1,hair:3,hc:3,outfit:0,pc:1,acc:2,model:'av-f-7-6-0-0-3-2-11-0'}},
  {id:'jayden',name:'Jayden',tag:'Student',x:19,y:12,dir:'left',sc:'recess',greet:'No way, I had it first!',
   look:{color:1,skin:4,hair:0,hc:1,outfit:1,pc:3,acc:1,model:'av-m-0-1-1-0-0-1-0-0'}}]
};

/* ---------- scenarios ---------- */
/* each choice: t = what you say or do, to = next node, pts = 0..2, fb = coaching feedback */
const SC={
 offtask:{title:'Taking Over: An Off-Task Student',place:'Classroom',
  intro:'Ms. Rivera has to step out to take a call from the office. You will lead the 4th grade math warm-up on your own for ten minutes. She whispers: "Heads up, Jordan has had a rough morning."',
  start:'a1',
  nodes:{
   a1:{who:'Narrator',text:'You start the warm-up. Two minutes in, Jordan, in the back row, is tapping a pencil loudly and whispering to a neighbor. A few students turn around to look.',
    ch:[
     {t:'Keep teaching. Walk toward Jordan\'s desk while you talk and quietly tap the desk.',to:'a2',pts:2,fb:'Proximity and a nonverbal cue redirect the behavior without stopping instruction or putting Jordan on the spot.'},
     {t:'Stop the lesson. "Jordan, stop that right now. Everyone is waiting on you."',to:'b2',pts:0,fb:'A public call-out puts Jordan in front of an audience. Students who are already having a hard day often push back to save face.'},
     {t:'Ignore it and hope it stops on its own.',to:'c2',pts:1,fb:'Planned ignoring can work for small attention-seeking behavior, but this is already pulling other students off task.'}]},
   a2:{who:'Narrator',text:'Jordan stops tapping. A minute later Jordan puts their head down on the desk and does not start the problems.',
    ch:[
     {t:'Crouch beside the desk and say quietly: "You okay? Try just the first two problems and I will check back in two minutes."',to:'a3',pts:2,fb:'A private, warm check-in plus a small, doable task lowers the barrier to starting. Promising to come back builds trust when you follow through.'},
     {t:'"Head up, Jordan. This warm-up counts for a grade."',to:'m3',pts:0,fb:'A threat may get compliance for a moment, but it does not address why Jordan is shutting down.'},
     {t:'Send Jordan to the office.',to:'endOffice',pts:0,fb:'Removal is for safety concerns. Here it costs Jordan learning time and tells the class you cannot handle it in the room.'}]},
   b2:{who:'Jordan',text:'"Why are you always picking on me? Sam was talking too!" A few students go "Ooooh."',
    ch:[
     {t:'Stay calm: "You might be right. Let\'s talk after the warm-up. For now, everyone, problem one." Then move on.',to:'m3',pts:2,fb:'Acknowledging the feeling and delaying the conversation takes away the audience and the power struggle.'},
     {t:'"I saw you, not Sam. Don\'t argue with me."',to:'endPower',pts:0,fb:'Arguing in front of the class turns a small moment into a contest that both of you lose.'},
     {t:'Send Jordan to the office.',to:'endOffice',pts:0,fb:'Removal after you escalated it teaches Jordan that pushing back gets them out of work.'}]},
   c2:{who:'Narrator',text:'The tapping gets louder. Now Sam joins in, and two tables are laughing instead of working.',
    ch:[
     {t:'Use your attention signal ("Class, class!"), then give one clear next step: "Problem two, on your own, two minutes, go."',to:'a2',pts:2,fb:'A whole-class reset with a clear, timed task gets everyone back without singling anyone out.'},
     {t:'Raise your voice over the noise: "Everybody stop talking!"',to:'b2',pts:0,fb:'Shouting over noise usually adds to it, and students learn to wait for the loud voice before listening.'}]},
   a3:{who:'Narrator',text:'When you check back, Jordan has finished two problems. Ms. Rivera walks back in. "How did it go?"',
    ch:[
     {t:'"Pretty well. Jordan had a slow start, but finished two problems after a quick check-in. Is there anything I should know about Jordan?"',to:'endGood',pts:2,fb:'An honest, specific report that includes progress, plus a question, makes you a partner with your mentor.'},
     {t:'"Fine, except Jordan was disruptive the whole time."',to:'endOk',pts:1,fb:'Accurate in part, but it leaves out the progress and does not help you learn more about the student.'}]},
   m3:{who:'Narrator',text:'The class settles down. Jordan works slowly but finishes one problem. Ms. Rivera walks back in. "How did it go?"',
    ch:[
     {t:'"It got bumpy with Jordan at one point. Here is what I tried. What would you do next time?"',to:'endOk',pts:2,fb:'Reflecting openly and asking for advice is exactly what strong student teachers do.'},
     {t:'"Jordan was really rude to me."',to:'endPower',pts:0,fb:'Focusing only on the student\'s behavior misses what you can change about your own moves.'}]},
   endGood:{end:true,title:'Calm and connected',text:'You kept the lesson moving, corrected privately, and helped Jordan get started. That is the heart of low-key classroom management.',
    keys:['Use proximity and nonverbal cues before words.','Correct privately and give a small, doable next step.','Follow through on check-ins and report progress honestly.']},
   endOk:{end:true,title:'Back on track',text:'The class recovered, but some moves made the moment bigger than it needed to be. Try the scenario again and look for a quieter option.',
    keys:['Public correction raises the stakes for the student.','Delay the conversation: "Let\'s talk after the warm-up."','Ask your mentor about students\' needs.']},
   endPower:{end:true,title:'Power struggle',text:'The moment turned into a contest between you and Jordan. These happen to every new teacher, and the fix is usually to step back, not push harder.',
    keys:['Take away the audience before you address behavior.','Acknowledge the feeling, then redirect to the task.','Plan a private follow-up conversation.']},
   endOffice:{end:true,title:'Sent out',text:'Jordan left the room and missed the lesson. Office referrals are for safety, and they do not teach the skills Jordan needs to stay in class.',
    keys:['Keep removal for safety concerns.','Try proximity, a private word, then a choice.','Partner with your mentor on a plan for repeat behavior.']}}},

 parent:{title:'Parent Conference: A Worried Parent',place:'Library',
  intro:'Mrs. Patel stops you in the library after school. Her son Arjun is in your 3rd grade class, and his reading grade dropped from a B to a D this quarter.',
  start:'p1',
  nodes:{
   p1:{who:'Mrs. Patel',text:'"I saw Arjun\'s reading grade online. A D? He has always been a good reader. What is going on in your class?"',
    ch:[
     {t:'"Thank you for coming to talk with me. I can tell you care a lot about Arjun. Can I show you what I have been seeing?"',to:'p2',pts:2,fb:'Opening with appreciation and an invitation to look at evidence together lowers defensiveness right away.'},
     {t:'"Arjun hasn\'t been turning in his reading logs. That\'s why."',to:'p2',pts:1,fb:'The facts are right, but leading with blame can make a parent feel attacked before you have built any trust.'},
     {t:'"Grades follow the district rubric. It\'s not really up to me."',to:'p2x',pts:0,fb:'Deflecting responsibility sounds dismissive, and the parent leaves the conversation without answers.'}]},
   p2:{who:'Narrator',text:'You show his work. His comprehension answers are strong, but 4 of 6 weekly reading logs are missing. Mrs. Patel frowns: "He told me he finished those at school!"',
    ch:[
     {t:'"That is really helpful to know. Maybe there is a mix-up. Could we try a folder that comes home every Friday so we can both see the logs?"',to:'p3',pts:2,fb:'You treat the parent as a partner and offer a simple system that solves the problem instead of assigning blame.'},
     {t:'"Well, he didn\'t. Kids are not always honest about homework."',to:'p3',pts:0,fb:'This may be true, but it puts the parent in the position of defending her child against you.'},
     {t:'"I will talk to Arjun about lying."',to:'p3',pts:0,fb:'Jumping to a consequence before understanding what happened can damage your relationship with both Arjun and his family.'}]},
   p2x:{who:'Mrs. Patel',text:'"So nobody is responsible? Then I would like to talk to the principal."',
    ch:[
     {t:'"You are right to ask, and I am sorry. I am responsible for his grade. Let\'s look at his work together right now."',to:'p2',pts:2,fb:'Owning the moment and repairing quickly can turn a conference around.'},
     {t:'"That is your right."',to:'endEsc',pts:0,fb:'The parent leaves frustrated, and the problem now involves more people without any plan for Arjun.'}]},
   p3:{who:'Mrs. Patel',text:'"Okay. So what can I do at home to help him?"',
    ch:[
     {t:'Give two specific ideas (15 minutes of reading with a parent, then sign the log) and set a check-in date in two weeks.',to:'endGood',pts:2,fb:'Specific, doable steps and a follow-up date show you have a plan and will stay in touch.'},
     {t:'"Just make sure he reads more at home."',to:'endOk',pts:1,fb:'Well meant, but vague. Families need concrete steps and a way to know if things are improving.'}]},
   endGood:{end:true,title:'Partners for Arjun',text:'Mrs. Patel leaves with a clear plan and trust in you. Strong family partnerships start with listening and shared evidence.',
    keys:['Open with appreciation and invite the parent to look at evidence.','Treat the parent as a partner, not an opponent.','End with specific next steps and a follow-up date.']},
   endOk:{end:true,title:'Okay, for now',text:'The conversation ended calmly, but without a clear plan or much trust. Try again and look for ways to partner with the parent.',
    keys:['Lead with care before facts.','Avoid language that blames the child or the parent.','Offer concrete, doable steps.']},
   endEsc:{end:true,title:'Escalated',text:'The parent went to the principal frustrated. Deflecting responsibility is one of the fastest ways to lose a family\'s trust.',
    keys:['Own your role in the student\'s grade.','Repair quickly when a conversation goes wrong.','Keep the focus on what will help the student.']}}},

 recess:{title:'Recess Conflict: Who Had the Ball?',place:'Campus Quad',
  intro:'You are on recess duty. Maya and Jayden, both 2nd graders, are shouting over a soccer ball. Other kids are starting to gather around.',
  start:'r1',
  nodes:{
   r1:{who:'Maya and Jayden',text:'Maya: "He took the ball! It was our turn!" Jayden: "She\'s lying, I had it first!"',
    ch:[
     {t:'Step between them calmly: "I can see you are both upset. Let\'s take a breath. Maya first, then Jayden, you will both get a turn to talk."',to:'r2',pts:2,fb:'Calming everyone and promising both students a turn to be heard is the first step of conflict resolution.'},
     {t:'Take the ball: "Then nobody gets it."',to:'r2b',pts:1,fb:'It stops the fight fast, but it punishes both students and teaches no skills for next time.'},
     {t:'Decide right away: "Jayden, give the ball back to Maya."',to:'r2c',pts:0,fb:'Deciding without listening can feel unfair, especially if you did not see what happened.'}]},
   r2:{who:'Narrator',text:'Maya says her group had the ball before the bell. Jayden says they left it on the grass, so he picked it up. Both stories might be true.',
    ch:[
     {t:'Restate both sides, then ask: "What could we do so both groups get to play?"',to:'r3',pts:2,fb:'Restating shows you listened, and asking them to solve it builds problem-solving skills they can use without you.'},
     {t:'Give them the solution: "Take turns every five minutes."',to:'r3b',pts:1,fb:'A fair solution, but students are more likely to follow a plan they came up with themselves.'}]},
   r2b:{who:'Narrator',text:'Both kids stand there with arms crossed. Maya mutters, "That\'s not fair." Jayden kicks at the grass.',
    ch:[
     {t:'"You\'re right, let\'s figure out a fair plan together. What happened?"',to:'r2',pts:2,fb:'Reopening the conversation turns a quick stop into a chance to teach.'},
     {t:'"Recess is almost over anyway."',to:'endBad',pts:0,fb:'The conflict is not solved, and it will likely come back tomorrow.'}]},
   r2c:{who:'Narrator',text:'Jayden throws the ball down hard and storms off toward the trees. Maya smirks at her friends.',
    ch:[
     {t:'Ask a nearby duty teacher to watch the group, then walk over to Jayden calmly to hear his side.',to:'endOk',pts:2,fb:'Following up privately, and keeping the rest of the group supervised, repairs the moment.'},
     {t:'Let Jayden go cool off on his own.',to:'endBad',pts:0,fb:'Jayden feels unheard, and you have lost track of a student during recess.'}]},
   r3:{who:'Narrator',text:'Jayden suggests: "We could split the field, half and half." Maya agrees. You notice a quieter student, Leo, standing alone at the edge, watching.',
    ch:[
     {t:'Praise their idea, then ask: "Leo, want to join Jayden\'s team?"',to:'endGood',pts:2,fb:'You recognized the solution and used the moment to include someone who was left out.'},
     {t:'Praise their idea and walk back to your duty spot.',to:'endOk',pts:1,fb:'Good resolution, but you missed a chance to include a student who was on the sidelines.'}]},
   r3b:{who:'Jayden',text:'"Fine. But she always gets it first."',
    ch:[
     {t:'"Let\'s try it today and check in after five minutes to see if it feels fair."',to:'endOk',pts:2,fb:'A quick check-in shows you take fairness seriously.'},
     {t:'"That\'s enough. Go play."',to:'endBad',pts:0,fb:'Shutting down the complaint leaves Jayden feeling the plan is not his.'}]},
   endGood:{end:true,title:'Problem solvers',text:'The students solved their own conflict, and Leo got to play too. You built skills that will carry over to the next recess.',
    keys:['Calm the moment and give each student a turn to talk.','Restate both sides, then let students propose solutions.','Look for students who are left out.']},
   endOk:{end:true,title:'Settled',text:'The conflict calmed down. Try again and look for a way to let students build the solution themselves.',
    keys:['Listen before you decide.','Students follow plans they help create.','Follow up privately with upset students.']},
   endBad:{end:true,title:'Unresolved',text:'Recess ended, but the problem did not. Quick fixes often bring the same conflict back the next day.',
    keys:['Stopping a fight is not the same as solving it.','Keep every student supervised.','Use conflicts as teaching moments.']}}}
};

/* ---------- NPC objects (shaped like players so the avatar code can draw them) ---------- */
const cache={};
function npcsFor(mapId){if(cache[mapId])return cache[mapId];
 cache[mapId]=(NPCS[mapId]||[]).map((n,i)=>Object.assign({id:'npc-'+n.id,npcId:n.id,sc:n.sc,greet:n.greet,tag:n.tag,name:n.name,
  x:n.x+.5,y:n.y+.5,rx:n.x+.5,ry:n.y+.5,dir:n.dir,moving:false,hand:false,voice:false,mic:false,speaking:false,role:'npc',seed:i*1.7+.3},n.look));
 return cache[mapId];}
/* mark NPC tiles as solid so people walk around them (value 15 is drawn as plain floor) */
function block(mapId,G){for(const n of NPCS[mapId]||[])if(G[n.y]&&G[n.y][n.x]===0)G[n.y][n.x]=15;}
function hit(mapId,x,y){for(const p of npcsFor(mapId))if(Math.hypot(p.x-x,p.y-y)<.75)return p;return null;}
function nearest(mapId,x,y,r){let best=null,bd=r||1.7;for(const p of npcsFor(mapId)){const d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=p;}}return best;}
/* a free tile next to the NPC, for click-to-walk */
function approach(mapId,p,G){const tx=Math.floor(p.x),ty=Math.floor(p.y);
 for(const [dx,dy] of [[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,1]]){const x=tx+dx,y=ty+dy;if(G[y]&&G[y][x]===0)return [x,y];}return null;}

/* ---------- UI ---------- */
let host=null,ui=null,cur=null,near=null,onOpen=null,onClose=null;
const css=`
#simPrompt{position:absolute;left:50%;bottom:86px;transform:translateX(-50%);z-index:30;background:#7a5cff;color:#fff;border-radius:999px;padding:0 20px;min-height:46px;font-weight:900;box-shadow:0 8px 24px rgba(0,0,0,.3);display:flex;align-items:center;gap:10px;white-space:nowrap}
#simPrompt kbd{background:rgba(255,255,255,.22);border-radius:6px;padding:1px 8px;font:800 13px Nunito,sans-serif}
#simPrompt:hover{filter:brightness(1.08)}
#sim{position:absolute;inset:0;z-index:40;display:grid;place-items:center;padding:14px;background:rgba(15,25,22,.55);backdrop-filter:blur(2px)}
#sim .sp{width:min(680px,100%);max-height:100%;overflow:auto;background:#fbf8f2;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,.4);padding:20px 22px 18px;color:#1d2a2f}
#sim .sh{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px}
#sim .sh .tt{flex:1}
#sim .sh small{display:block;font-weight:800;color:#7a5cff;text-transform:uppercase;letter-spacing:.06em;font-size:11px}
#sim .sh h2{margin:0;font-size:21px;line-height:1.2;font-weight:900}
#sim .x{background:#ebe3d2;min-height:34px;padding:0 12px}
#sim .who{display:flex;align-items:center;gap:10px;margin:4px 0 6px;font-weight:900}
#sim .av{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:900;font-size:14px;flex:none}
#sim .say{background:#fff;border:2px solid #e3e0d8;border-radius:14px;padding:12px 14px;margin:0 0 14px;font-size:16px}
#sim .chs{display:grid;gap:8px}
#sim .chs button{text-align:left;background:#fff;border:2px solid #d8d2ff;padding:10px 14px 10px 44px;position:relative;font-weight:700;line-height:1.4;min-height:48px}
#sim .chs button:hover{border-color:#7a5cff;background:#f6f4ff}
#sim .chs button b{position:absolute;left:12px;top:10px;width:22px;height:22px;border-radius:50%;background:#7a5cff;color:#fff;font-size:12px;display:grid;place-items:center}
#sim .fb{border-radius:14px;padding:12px 14px;margin:0 0 14px;border:2px solid}
#sim .fb.g{background:#eaf7ef;border-color:#9fd8b6}#sim .fb.m{background:#fff6e2;border-color:#f2cf7c}#sim .fb.b{background:#fdeceb;border-color:#f0aaa6}
#sim .fb h3{margin:0 0 4px;font-size:15px}
#sim .you{font-size:14px;color:#5f6f73;margin:0 0 8px}
#sim .go{background:#24463a;color:#fff;width:100%}
#sim .row2{display:flex;gap:8px;flex-wrap:wrap}#sim .row2 button{flex:1}
#sim .alt{background:#ebe3d2}
#sim .score{display:flex;align-items:center;gap:12px;margin:2px 0 12px}
#sim .meter{flex:1;height:12px;border-radius:99px;background:#ebe3d2;overflow:hidden}#sim .meter i{display:block;height:100%;background:#2fa36b;border-radius:99px}
#sim ul{margin:6px 0 14px;padding-left:20px}
#sim details{margin:0 0 14px;background:#fff;border:2px solid #e3e0d8;border-radius:14px;padding:8px 12px}
#sim summary{font-weight:900;cursor:pointer}
#sim .step{border-top:1px solid #eee;padding:8px 0;font-size:14px}#sim .step:first-of-type{border-top:0}
#sim textarea{width:100%;min-height:70px;border:2px solid #e3e0d8;border-radius:10px;padding:8px 10px;font-size:15px;margin:4px 0 12px;resize:vertical}
#sim .pts{font-weight:900;font-size:12px;border-radius:99px;padding:1px 8px;margin-left:6px}
#sim .pts.g{background:#d6f0df;color:#1d6b43}#sim .pts.m{background:#fbe8b8;color:#7a5600}#sim .pts.b{background:#f8d3d1;color:#8a2a24}
@media (max-width:600px){#simPrompt{bottom:96px}#sim .sp{padding:16px}#sim .say{font-size:15px}}`;
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function mount(){if(ui)return;host=document.getElementById('stage')||document.body;
 const st=el('style');st.textContent=css;document.head.appendChild(st);
 const pr=el('button');pr.id='simPrompt';pr.type='button';pr.className='hidden';pr.onclick=()=>{if(near)open(near);};host.appendChild(pr);
 const ov=el('div');ov.id='sim';ov.className='hidden';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');
 const sp=el('div','sp');ov.appendChild(sp);host.appendChild(ov);
 ov.addEventListener('pointerdown',e=>e.stopPropagation());
 ui={pr,ov,sp};}
const COL=['#e4572e','#f3a712','#2aa84a','#1d9bd1','#7a5cff','#ff5fa2','#2e4057','#8d6e63'];
function speakerColor(who){if(!cur)return'#5f6f73';if(who==='Narrator')return'#5f6f73';for(const p of npcsFor(cur.map))if(who.indexOf(p.name)>=0)return COL[p.color]||'#7a5cff';return'#2e4057';}
const initials=w=>w==='Narrator'?'...':w.split(/\s+and\s+|\s+/).filter(s=>/^[A-Z]/.test(s)).map(s=>s[0]).join('').slice(0,2);
const grade=(p,max)=>max?(p/max>=.75?'g':p/max>=.4?'m':'b'):'g';

function open(p){mount();const s=SC[p.sc];if(!s)return;
 cur={map:p._map||Object.keys(NPCS).find(k=>npcsFor(k).includes(p)),npc:p,s,node:null,log:[],pts:0,max:0};
 ui.ov.classList.remove('hidden');ui.pr.classList.add('hidden');if(onOpen)onOpen(p);renderIntro();}
function close(){if(!ui)return;ui.ov.classList.add('hidden');cur=null;if(onClose)onClose();}
function header(sub){const sp=ui.sp;sp.innerHTML='';const h=el('div','sh');const tt=el('div','tt');tt.append(el('small',null,cur.s.place+' simulation'+(sub?' | '+sub:'')),el('h2',null,cur.s.title));
 const x=el('button','x','Leave');x.type='button';x.onclick=close;h.append(tt,x);sp.appendChild(h);return sp;}
function renderIntro(){const sp=header();const p=cur.npc;
 const w=el('div','who');const av=el('div','av',initials(p.name));av.style.background=COL[p.color]||'#7a5cff';w.append(av,el('span',null,p.name+' ('+p.tag+')'));
 sp.append(w,el('p','say',cur.s.intro));
 sp.appendChild(el('p','you','Choose what you would say or do. You will get feedback after each choice, and a summary at the end. Only you can see this.'));
 const b=el('button','go','Start');b.type='button';b.onclick=()=>show(cur.s.start);sp.appendChild(b);b.focus();}
function show(id){const n=cur.s.nodes[id];if(!n)return close();cur.node=id;if(n.end)return renderEnd(n);
 const sp=header('Step '+(cur.log.length+1));
 const w=el('div','who');const av=el('div','av',initials(n.who));av.style.background=speakerColor(n.who);w.append(av,el('span',null,n.who));
 sp.append(w,el('p','say',n.text));
 const order=n.ch.slice();for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 const chs=el('div','chs');order.forEach((c,i)=>{const b=el('button');b.type='button';b.append(el('b',null,String(i+1)),document.createTextNode(c.t));b.onclick=()=>choose(n,c);chs.appendChild(b);});
 sp.appendChild(chs);sp.appendChild(el('p','you','Tip: press 1, 2 or 3 to choose.'));const f=chs.querySelector('button');if(f)f.focus();}
function choose(n,c){const best=Math.max(...n.ch.map(x=>x.pts));cur.pts+=c.pts;cur.max+=best;cur.log.push({q:n.text,a:c.t,pts:c.pts,best,fb:c.fb});
 const sp=header('Step '+cur.log.length);const g=grade(c.pts,best);
 sp.appendChild(el('p','you','You chose: '+c.t));
 const fb=el('div','fb '+g);fb.append(el('h3',null,g==='g'?'Strong move':g==='m'?'Partly effective':'Think again'),el('div',null,c.fb));sp.appendChild(fb);
 const b=el('button','go','Continue');b.type='button';b.onclick=()=>show(c.to);sp.appendChild(b);b.focus();}
function renderEnd(n){const sp=header('Results');const pct=cur.max?Math.round(cur.pts/cur.max*100):100;
 const fb=el('div','fb '+grade(cur.pts,cur.max));fb.append(el('h3',null,n.title),el('div',null,n.text));sp.appendChild(fb);
 const sc=el('div','score');const m=el('div','meter');const i=el('i');i.style.width=pct+'%';m.appendChild(i);sc.append(el('b',null,'Score '+cur.pts+' / '+cur.max),m);sp.appendChild(sc);
 sp.appendChild(el('b',null,'Key ideas'));const ul=el('ul');for(const k of n.keys)ul.appendChild(el('li',null,k));sp.appendChild(ul);
 const d=el('details');d.appendChild(el('summary',null,'Review your choices'));
 cur.log.forEach((s,k)=>{const st=el('div','step');const top=el('div');top.append(el('b',null,(k+1)+'. '),document.createTextNode(s.a));const t=el('span','pts '+grade(s.pts,s.best),s.pts+'/'+s.best);top.appendChild(t);st.append(top,el('div','you',s.fb));d.appendChild(st);});
 sp.appendChild(d);
 sp.appendChild(el('b',null,'Reflection (optional)'));const ta=el('textarea');ta.placeholder='What would you do differently next time?';sp.appendChild(ta);
 const r=el('div','row2');
 const cp=el('button','alt','Copy my results');cp.type='button';cp.onclick=async()=>{const txt=summaryText(n,ta.value);try{await navigator.clipboard.writeText(txt);cp.textContent='Copied';}catch(e){ta.value=txt;ta.select();cp.textContent='Select and copy';}};
 const ag=el('button','alt','Try again');ag.type='button';ag.onclick=()=>{cur.log=[];cur.pts=0;cur.max=0;renderIntro();};
 const dn=el('button','go','Done');dn.type='button';dn.onclick=close;dn.style.width='auto';
 r.append(cp,ag,dn);sp.appendChild(r);dn.focus();}
function summaryText(n,refl){const L=['CommonRoom simulation: '+cur.s.title,'Ending: '+n.title,'Score: '+cur.pts+' / '+cur.max,''];
 cur.log.forEach((s,k)=>L.push((k+1)+'. '+s.a+' ('+s.pts+'/'+s.best+')'));if(refl&&refl.trim())L.push('','Reflection: '+refl.trim());return L.join('\n');}

/* keyboard: T to talk, 1-3 to choose, Esc to leave */
addEventListener('keydown',e=>{const tgt=e.target;if(tgt&&tgt.closest&&tgt.closest('input,textarea'))return;
 if(cur){e.stopPropagation();if(e.key==='Escape'){close();e.preventDefault();return;}
  const m=/^Digit([1-4])$/.exec(e.code||'');if(m){const bs=ui.sp.querySelectorAll('.chs button');const b=bs[+m[1]-1];if(b){b.click();e.preventDefault();}}
  return;}
 if(near&&e.code==='KeyT'){open(near);e.preventDefault();}},true);

/* called every frame by the page */
function update(mapId,me){if(!me)return;mount();
 const list=npcsFor(mapId);for(const p of list)p._map=mapId;
 const now=performance.now();
 const talker=nearest(mapId,me.x,me.y,4);
 for(const p of list){const d=Math.hypot(p.x-me.x,p.y-me.y);
  if(p===talker&&!cur){p.bubble=p.greet;p.bubbleT=now+400;}
  if(d<4){const dx=me.x-p.x,dy=me.y-p.y;p.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');}}
 const n=cur?null:nearest(mapId,me.x,me.y,1.7);
 if(n!==near){near=n;if(n){ui.pr.innerHTML='';ui.pr.append(document.createTextNode('Talk to '+n.name+' '));ui.pr.appendChild(el('kbd',null,'T'));}ui.pr.classList.toggle('hidden',!n);}}
/* badge shown above people who are in a simulation (seen by everyone in the room) */
function drawBusy(c,x,y,t){c.save();c.font='800 10px Nunito,sans-serif';const label='In a simulation',w=c.measureText(label).width+30,h=17;
 c.fillStyle='rgba(122,92,255,.95)';c.beginPath();c.roundRect(x-w/2,y-h,w,h,8.5);c.fill();
 c.beginPath();c.moveTo(x-4,y);c.lineTo(x+4,y);c.lineTo(x,y+5);c.fill();
 c.fillStyle='#fff';for(let i=0;i<3;i++){const a=.45+.55*Math.max(0,Math.sin(t*5-i*.9));c.globalAlpha=a;c.beginPath();c.arc(x-w/2+9+i*5,y-h/2,1.7,0,7);c.fill();}
 c.globalAlpha=1;c.textAlign='left';c.textBaseline='middle';c.fillText(label,x-w/2+24,y-h/2+.5);c.restore();}
function hide(){if(ui){ui.pr.classList.add('hidden');}near=null;if(cur)close();}

return {drawBusy,npcsFor,block,hit,nearest,approach,update,open,close,hide,isOpen:()=>!!cur,
 init(o){onOpen=o&&o.onOpen;onClose=o&&o.onClose;},SC,NPCS};
})();
