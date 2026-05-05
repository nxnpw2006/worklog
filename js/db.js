const db = firebase.firestore();

function addData(data){
 return db.collection('worklogs').add(data);
}

function getData(cb){
 db.collection('worklogs').orderBy('date','desc')
 .onSnapshot(snap=>{
  let arr=[];
  snap.forEach(doc=>arr.push({...doc.data(),id:doc.id}));
  cb(arr);
 });
}
