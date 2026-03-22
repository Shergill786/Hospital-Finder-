document.getElementById('med-date').min=new Date().toISOString().split('T')[0];
let done=1,total=3;
function updateProgress(){
  const pct=Math.round((done/total)*100);
  document.getElementById('prog-fill').style.width=pct+'%';
  document.getElementById('prog-text').textContent=done+' / '+total;
  document.getElementById('count-done').textContent=done;
  document.getElementById('count-pending').textContent=total-done;
  document.getElementById('count-total').textContent=total;
}
function toggleRem(idx,btn){
  const item=document.getElementById('rem-'+idx);
  const checked=btn.classList.toggle('checked');
  btn.textContent=checked?'✓':'';
  item.classList.toggle('done',checked);
  done=checked?done+1:done-1;
  updateProgress();
}
function deleteRem(id){
  const el=document.getElementById(id);
  if(el){el.style.opacity='0';el.style.transform='translateX(20px)';el.style.transition='all 0.3s';setTimeout(()=>el.remove(),300);total--;updateProgress();}
}
let remCount=3;
function addReminder(){
  const name=document.getElementById('med-name').value.trim();
  if(!name){alert('Please enter medicine name.');return;}
  const dose=document.getElementById('med-dose').value||'As prescribed';
  const time=document.getElementById('med-time');
  const notes=document.getElementById('med-notes').value;
  const timeLabels={morning:'🌅 Morning · 8:00 AM',afternoon:'☀️ Afternoon · 1:00 PM',evening:'🌆 Evening · 6:00 PM',night:'🌙 Night · 10:00 PM'};
  const badgeMap={morning:'badge-morning',afternoon:'badge-afternoon',evening:'badge-evening',night:'badge-night'};
  const id='rem-'+remCount++;
  const div=document.createElement('div');
  div.className='rem-item';div.id=id;
  div.innerHTML=`<div class="rem-check-btn" onclick="toggleRem('${id}',this)"></div><div class="rem-pill-icon" style="background:var(--blue-pale)">💊</div><div class="rem-info"><div class="rem-name">${name} – ${dose}</div><div class="rem-meta">${timeLabels[time.value]}${notes?' · '+notes:''}</div></div><span class="rem-badge ${badgeMap[time.value]}">${time.options[time.selectedIndex].text.split(' ')[1]}</span><button class="del-btn" onclick="deleteRem('${id}')"><i class="fas fa-trash"></i></button>`;
  document.getElementById('reminder-list').appendChild(div);
  total++;updateProgress();
  ['med-name','med-dose','med-notes'].forEach(i=>document.getElementById(i).value='');
  const btn=document.querySelector('.form-btn-blue');
  btn.innerHTML='<i class="fas fa-check"></i> Reminder Set!';
  btn.style.background='linear-gradient(135deg,#15803d,#16a34a)';
  setTimeout(()=>{btn.innerHTML='<i class="fas fa-bell"></i> Set Reminder';btn.style.background='';},2000);
}
