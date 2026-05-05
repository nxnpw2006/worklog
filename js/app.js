function save(){
 const date=document.getElementById('date').value;
 const timeIn=document.getElementById('in').value;
 const timeOut=document.getElementById('out').value;
 const breakHr=parseFloat(document.getElementById('break').value)||0;
 const ot=document.getElementById('ot').checked;
 const close=document.getElementById('close').checked;

 if(!date||!timeIn||!timeOut) return alert('กรอกข้อมูลให้ครบ');

 const c=calc(timeIn,timeOut,breakHr,ot,close);

 addData({date,timeIn,timeOut,breakHr,ot,close,...c});
}

getData(render);
