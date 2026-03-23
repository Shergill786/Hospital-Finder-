
// ── AUTH CHECK ──
const user = JSON.parse(sessionStorage.getItem('hf_user') || '{}');
if(!user.loggedIn) window.location.href='login.html';
// Set user info
if(user.name){
  document.getElementById('sb-name').textContent=user.name;
  document.getElementById('sb-email').textContent=user.email||'';
  document.getElementById('nav-user-name').textContent=user.name.split(' ')[0];
  const hour=new Date().getHours();
  const greet=hour<12?'Good Morning':hour<17?'Good Afternoon':'Good Evening';
  document.getElementById('greet-name').textContent=(hour<12?'Good Morning':hour<17?'Good Afternoon':'Good Evening')+', '+user.name.split(' ')[0]+'! 👋';
}
document.getElementById('tracker-date').textContent=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
document.getElementById('a-date').min=new Date().toISOString().split('T')[0];

// ── SECTION SWITCH ──
function showSection(id,btn){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(b=>b.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(window.innerWidth<768)document.getElementById('sidebar').classList.remove('open');
}

// ── SIDEBAR MOBILE ──
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');}

// ── LOGOUT ──
function logout(){sessionStorage.removeItem('hf_user');window.location.href='login.html';}

// ── TOAST ──
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2500);}

// ── HOME REMINDERS CHECK ──
let homeDone=1,homeTotal=3;
function checkRem(idx,btn){
  const item=document.getElementById('h-rem-'+idx);
  const on=btn.classList.toggle('on');
  btn.textContent=on?'✓':'';
  item.querySelector('.rem-name').style.textDecoration=on?'line-through':'none';
  item.querySelector('.rem-name').style.opacity=on?'0.5':'1';
  homeDone=on?homeDone+1:homeDone-1;
  document.getElementById('prog-text-home').textContent=homeDone+' / '+homeTotal+' done';
  document.getElementById('prog-home').style.width=Math.round((homeDone/homeTotal)*100)+'%';
}

// ── FULL REMINDERS CHECK ──
let remDone=1,remTotal=3;
function checkRemFull(idx,btn){
  const item=document.getElementById('r-'+idx);
  const on=btn.classList.toggle('on');
  btn.textContent=on?'✓':'';
  const name=item.querySelector('.rem-name');
  name.style.textDecoration=on?'line-through':'none';name.style.opacity=on?'0.5':'1';
  remDone=on?remDone+1:remDone-1;
  document.getElementById('rem-progress').textContent=remDone+' / '+remTotal;
  document.getElementById('rem-prog-fill').style.width=Math.round((remDone/remTotal)*100)+'%';
}

// ── ADD REMINDER ──
let rCount=3;
function addReminder(){
  const name=document.getElementById('r-name').value.trim();
  if(!name){alert('Please enter medicine name.');return;}
  const dose=document.getElementById('r-dose').value||'As prescribed';
  const time=document.getElementById('r-time');
  const notes=document.getElementById('r-notes').value;
  const tmap={morning:{label:'Morning',time:'8:00 AM',bg:'#fef3c7',color:'#92400e'},afternoon:{label:'Afternoon',time:'1:00 PM',bg:'#fff7ed',color:'#c2410c'},evening:{label:'Evening',time:'6:00 PM',bg:'#eff6ff',color:'#1d4ed8'},night:{label:'Night',time:'10:00 PM',bg:'#f5f3ff',color:'#6d28d9'}};
  const t=tmap[time.value];
  const id='r-'+rCount++;
  const div=document.createElement('div');
  div.className='rem-item';div.id=id;
  div.innerHTML=`<div class="rem-chk" onclick="checkRemFull('${id}',this)"></div><div class="rem-pill">💊</div><div style="flex:1"><div class="rem-name">${name} – ${dose}</div><div class="rem-meta">${t.time}${notes?' · '+notes:''}</div></div><span class="rem-tag" style="background:${t.bg};color:${t.color};">${t.label}</span>`;
  document.getElementById('rem-list').appendChild(div);
  remTotal++;
  document.getElementById('rem-progress').textContent=remDone+' / '+remTotal;
  document.getElementById('rem-prog-fill').style.width=Math.round((remDone/remTotal)*100)+'%';
  ['r-name','r-dose','r-notes'].forEach(i=>document.getElementById(i).value='');
  showToast('🔔 Reminder set for '+name+'!');
}

// ── BOOK APPOINTMENT ──
function bookAppt(){
  const name=document.getElementById('a-name').value.trim();
  const city=document.getElementById('a-city').value;
  const spec=document.getElementById('a-spec').value;
  const date=document.getElementById('a-date').value;
  if(!name||!city||!spec||!date){alert('Please fill all required fields.');return;}
  const time=document.getElementById('a-time').value;
  const div=document.createElement('div');
  div.className='appt-item';
  div.innerHTML=`<div class="ai-icon">📅</div><div style="flex:1"><div class="ai-name">${spec} – ${city}</div><div class="ai-time">${date} · ${time}</div></div><span class="badge badge-y">Pending</span>`;
  document.getElementById('appt-list').insertBefore(div,document.getElementById('appt-list').firstChild);
  ['a-name','a-age','a-date','a-reason'].forEach(i=>document.getElementById(i).value='');
  showToast('✅ Appointment booked for '+date+'!');
}

// ── VITALS ──
function updBar(id,val,min,max){const pct=Math.min(100,Math.max(0,((val-min)/(max-min))*100));const b=document.getElementById(id);if(b)b.style.width=pct+'%';}
function saveVitals(){
  const h=document.getElementById('t-heart').value;
  const b=document.getElementById('t-bp').value;
  const s=document.getElementById('t-spo2').value;
  const t=document.getElementById('t-temp').value;
  if(!h&&!b&&!s){alert('Enter at least one vital.');return;}
  const date=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'});
  const row=document.createElement('tr');
  row.innerHTML=`<td><strong>${date}</strong></td><td class="lv">${h||'—'}</td><td class="lv">${b||'—'}</td><td class="lv">${s?s+'%':'—'}</td><td class="lv">${t?t+'°':'—'}</td>`;
  row.style.background='#f0fdf4';
  document.getElementById('log-body').insertBefore(row,document.getElementById('log-body').firstChild);
  ['t-heart','t-bp','t-spo2','t-temp','t-weight'].forEach(i=>document.getElementById(i).value='');
  ['b-heart','b-bp','b-spo2','b-temp'].forEach(i=>{const el=document.getElementById(i);if(el)el.style.width='0%';});
  showToast('💗 Vitals saved successfully!');
}

// ── MOBILE MENU BUTTON ──
if(window.innerWidth<768)document.getElementById('menu-toggle').style.display='block';
window.addEventListener('resize',()=>{document.getElementById('menu-toggle').style.display=window.innerWidth<768?'block':'none';});
