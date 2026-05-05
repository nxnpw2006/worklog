function render(data){
 let html='<table><tr><th>Date</th><th>Hours</th><th>Pay</th></tr>';
 data.forEach(d=>{
  html+=`<tr><td>${d.date}</td><td>${d.hours}</td><td>${d.pay}</td></tr>`;
 });
 html+='</table>';
 document.getElementById('table').innerHTML=html;
}
