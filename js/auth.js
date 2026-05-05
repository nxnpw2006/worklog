function loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result)=>{
        console.log("login success", result.user);
        window.location = "index.html";
    })
    .catch((error)=>{
        alert(error.message);
    });
}
function logout(){
    firebase.auth().signOut()
    .then(()=> window.location = "login.html");
}
firebase.auth().onAuthStateChanged(user => {
    if(user){
        if(location.pathname.includes("login.html")){
            window.location = "index.html";
        }
    }else{
        if(location.pathname.includes("index.html")){
            window.location = "login.html";
        }
    }
});
