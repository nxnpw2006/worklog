async function save() {
  const date = document.getElementById("date").value;
  const inTime = document.getElementById("in").value;
  const outTime = document.getElementById("out").value;
  const breakHr = parseFloat(document.getElementById("break").value);

  const ot = document.getElementById("ot").checked;
  const close = document.getElementById("close").checked;

  const c = calc(inTime, outTime, breakHr, ot, close);

  await saveEntry({
    date,
    ...c
  });

  loadData();
}

async function loadData() {
  const data = await getEntries();
  renderTable(data);
}
