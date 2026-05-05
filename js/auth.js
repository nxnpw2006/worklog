function login(){
 const email = document.getElementById('email').value;
 const pass = document.getElementById('password').value;
 firebase.auth().signInWithEmailAndPassword(email,pass)
 .then(()=> location='index.html')
 .catch(e=>alert(e.message));
}

function logout(){
 firebase.auth().signOut().then(()=>location='login.html');
}

firebase.auth().onAuthStateChanged(user=>{
 if(user){
  const el=document.getElementById('user');
  if(el) el.innerText = user.email;
 }else{
  if(location.pathname.includes('index.html')) location='login.html';
 }
});
