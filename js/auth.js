let currentUser = null;

// Login
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      window.location = "index.html";
    })
    .catch(err => alert(err.message));
}

// Logout
function logout() {
  auth.signOut();
}

// Check login
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;

    if (document.getElementById("user")) {
      document.getElementById("user").innerText = user.displayName;
      loadData();
    }
  } else {
    if (location.pathname.includes("index.html")) {
      window.location = "login.html";
    }
  }
});
