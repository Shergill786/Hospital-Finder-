function switchTab(id,btn){
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-'+id).classList.add('active');
  }
  function doLogin(){
    const email=document.getElementById('li-email').value.trim();
    const password=document.getElementById('li-pass').value.trim();
    if(!email||!password){alert('Please fill all required fields.');return;}
    const btn=document.getElementById('login-btn');
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Signing in...';
    btn.disabled=true;
    setTimeout(()=>{
      // Extract name from email (capitalize first letter)
      const nameFromEmail=email.split('@')[0].charAt(0).toUpperCase()+email.split('@')[0].slice(1);
      // Save user to sessionStorage
      sessionStorage.setItem('hf_user',JSON.stringify({name:nameFromEmail,email:email,loggedIn:true}));
      window.location.href='dashboard.html';
    },1200);
  }
  function doRegister(){
    const fname=document.getElementById('reg-fname').value.trim();
    const email=document.getElementById('reg-email').value.trim();
    if(!fname||!email){alert('Please fill all required fields.');return;}
    const btn=document.getElementById('reg-btn');
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Creating account...';
    btn.disabled=true;
    setTimeout(()=>{
      sessionStorage.setItem('hf_user',JSON.stringify({name:fname+' '+(document.getElementById('reg-lname').value||''),email:email,loggedIn:true}));
      window.location.href='dashboard.html';
    },1200);
  }