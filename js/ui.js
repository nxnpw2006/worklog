function renderTable(data) {
  const el = document.getElementById("table");

  el.innerHTML = data.map(d => `
    <div>
      ${d.date} | ${d.total} บาท
      <button onclick="del('${d.id}')">ลบ</button>
    </div>
  `).join("");
}

async function del(id) {
  await deleteEntry(id);
  loadData();
}
