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
