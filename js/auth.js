let currentUser = null;

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;

    if (location.pathname.includes("login.html")) {
      location.href = "index.html";
    }

    document.getElementById("userBox").innerHTML =
      `${user.displayName}`;

    loadData();

  } else {
    if (!location.pathname.includes("login.html")) {
      location.href = "login.html";
    }
  }
});