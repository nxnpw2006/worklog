// บันทึกข้อมูล
async function saveEntry(data) {
    const user = auth.currentUser;
    if (!user) return;
    return await dbStore.collection("worklogs").add({
        uid: user.uid,
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// ดึงข้อมูล
async function getEntries() {
    const user = auth.currentUser;
    if (!user) return [];
    const snapshot = await dbStore.collection("worklogs")
        .where("uid", "==", user.uid)
        .orderBy("date", "desc")
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ลบข้อมูล
async function deleteEntry(id) {
    return await dbStore.collection("worklogs").doc(id).delete();
}
