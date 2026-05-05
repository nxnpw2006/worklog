function calc(timeIn,timeOut,breakHr,ot,close){
 const s=new Date(`2000-01-01T${timeIn}`);
 const e=new Date(`2000-01-01T${timeOut}`);
 let diff=(e-s)/3600000;
 if(diff<0) diff+=24;
 const h=Math.max(0,diff-breakHr);
 let pay=h*(ot?120:60);
 if(close) pay+=40;
 return {hours:h.toFixed(2),pay};
}
