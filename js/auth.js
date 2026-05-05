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
auth.onAuthStateChanged(user => {
    const userDiv = document.getElementById("user");
    if (user) {
        // ถ้าล็อกอินอยู่
        if (userDiv) userDiv.innerText = user.displayName;
        
        // --- จุดสำคัญ: สั่งโหลดข้อมูลเก่าทันทีที่ยืนยันตัวตนสำเร็จ ---
        console.log("User logged in, fetching data...");
        loadData(); 
    } else {
        // ถ้าไม่ได้ล็อกอิน ให้เด้งไปหน้า login
        if (!window.location.pathname.includes("login.html")) {
            window.location = "login.html";
        }
    }
});
