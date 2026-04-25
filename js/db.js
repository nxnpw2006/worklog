async function saveEntry(data) {
  await db.collection("worklogs").add({
    ...data,
    uid: currentUser.uid
  });
}

async function getEntries() {
  const snap = await db.collection("worklogs")
    .where("uid", "==", currentUser.uid)
    .get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function deleteEntry(id) {
  await db.collection("worklogs").doc(id).delete();
}
